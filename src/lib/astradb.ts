import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { DataAPIClient } from "@datastax/astra-db-ts";

const endpoint = process.env.ASTRA_DB_ENDPOINT || "";
const token = process.env.ASTRA_DB_APPLICATION || "";
const collection = process.env.ASTRA_DB_COLLECTION || "";

if (!token || !endpoint || !collection) {
    throw new Error("Astra DB credentials are not set in the environment variables.");
}

export async function getvectorStore() {
    return AstraDBVectorStore.fromExistingIndex(
        new GoogleGenerativeAIEmbeddings({ model: "text-embedding-004", }),
        {
            token,
            endpoint,
            collection,
            collectionOptions: {
                vector: {
                    dimension: 768,
                    metric: "cosine"
                }
            }
        }
    )
}

export async function getEmbeddingsCollection() {
    const { ASTRA_DB_API_ENDPOINT: endpoint, ASTRA_DB_APPLICATION_TOKEN: token } =
    process.env; 

  if (!token || !endpoint) {
    throw new Error(
      "Environment variables ASTRA_DB_API_ENDPOINT and ASTRA_DB_APPLICATION_TOKEN must be defined.",
    );
  }

  // Create an instance of the `DataAPIClient` class with your token.
  const client = new DataAPIClient(token);

  // Get the database specified by your endpoint.
  const database = client.db(endpoint);

  console.log(`Connected to database ${database.id}`);

  return database;
}

