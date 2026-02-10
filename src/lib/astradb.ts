import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { DataAPIClient } from "@datastax/astra-db-ts";

const endpoint = process.env.ASTRA_DB_ENDPOINT || "";
const token = process.env.ASTRA_DB_APPLICATION || "";
const collection = process.env.ASTRA_DB_COLLECTION || "";

if (!token || !endpoint || !collection) {
    throw new Error("Astra DB credentials are not set in the environment variables.");
}

export async function getVectorStore() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {
        token,
        endpoint,
        collection,
        collectionOptions: {
            vector: {
                dimension: 3072,
                metric: "cosine"
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
        }
    };

    return AstraDBVectorStore.fromExistingIndex(
        new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GOOGLE_API_KEY,
            modelName: "gemini-embedding-001",
        }),
        options
    )
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

    console.log(`Connected to database ${database.id}`);

    return database;
}
