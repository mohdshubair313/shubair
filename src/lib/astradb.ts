import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { DataAPIClient } from "@datastax/astra-db-ts";
import { Document } from "@langchain/core/documents";

function getConfig() {
    const endpoint = process.env.ASTRA_DB_ENDPOINT || "";
    const token = process.env.ASTRA_DB_APPLICATION || "";
    const collection = process.env.ASTRA_DB_COLLECTION || "";
    if (!token || !endpoint || !collection) {
        throw new Error("Astra DB credentials are not set in the environment variables.");
    }
    return { endpoint, token, collection };
}

// Provisioning is only needed by the offline ingestion script, never a chat request.
export async function getVectorStore({ provision = false } = {}) {
    const { endpoint, token, collection } = getConfig();
    const options = {
        token,
        endpoint,
        collection,
        maxRetries: 0,
        ...(provision ? { collectionOptions: {
            vector: {
                dimension: 3072,
                metric: "cosine" as const
            },
            indexing: {
                allow: ["metadata"]
            },
            lexical: {
                enabled: true,
                analyzer: "standard"
            },
            rerank: {
                enabled: true,
                service: {
                    provider: "nvidia",
                    modelName: "nvidia/llama-3.2-nv-rerankqa-1b-v2"
                }
            }
        } } : { skipCollectionProvisioning: true }),
    };

    return AstraDBVectorStore.fromExistingIndex(
        new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GOOGLE_API_KEY,
            modelName: "gemini-embedding-001",
            maxRetries: 0,
        }),
        options
    )
}

// Resolve retrieval before starting the answer stream so failures can use the fallback.
export async function retrievePortfolioDocuments(query: string, signal: AbortSignal) {
    const { collection } = getConfig();
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) throw new Error("GOOGLE_API_KEY is not configured.");

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
            model: "models/gemini-embedding-001",
            content: { parts: [{ text: query.replace(/\n/g, " ") }] },
        }),
        signal: AbortSignal.any([signal, AbortSignal.timeout(5000)]),
    });
    if (!response.ok) throw new Error(`Embedding service returned HTTP ${response.status}.`);
    const result = await response.json();
    const vector: number[] = result.embedding?.values;
    if (!Array.isArray(vector) || vector.length !== 3072) {
        throw new Error("Embedding service returned an unexpected vector dimension.");
    }
    signal.throwIfAborted();

    const db = await getEmbeddingsCollection();
    const rows = await db.collection(collection, { defaultMaxTimeMS: 4000 }).find({}, {
        sort: { $vector: vector },
        limit: 6,
        projection: { text: 1, _id: 0 },
    }).toArray();
    signal.throwIfAborted();

    return rows.flatMap((row) => typeof row.text === "string"
        ? [new Document({ pageContent: row.text })]
        : []);
}

export async function getEmbeddingsCollection() {
    const { ASTRA_DB_ENDPOINT: endpoint, ASTRA_DB_APPLICATION: token } =
        process.env;

    if (!token || !endpoint) {
        throw new Error(
            "Environment variables ASTRA_DB_ENDPOINT and ASTRA_DB_APPLICATION must be defined.",
        );
    }

    // Create an instance of the `DataAPIClient` class with your token.
    const client = new DataAPIClient(token);

    // Get the database specified by your endpoint.
    const database = client.db(endpoint);

    return database;
}
