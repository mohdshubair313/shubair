import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { OpenAIEmbeddings } from "@langchain/openai";
import { DataAPIClient } from "@datastax/astra-db-ts";

const endpoint = process.env.ASTRA_DB_ENDPOINT || "";
const token = process.env.ASTRA_DB_APPLICATION || "";
const collection = process.env.ASTRA_DB_COLLECTION || "";

if (!token || !endpoint || !collection) {
    throw new Error("Astra DB credentials are not set in the environment variables.");
}

export async function getVectorStore() {
    return AstraDBVectorStore.fromExistingIndex(
        new OpenAIEmbeddings({ 
            model: "text-embedding-3-small",
        }),
        {
            token,
            endpoint,
            collection,
            collectionOptions: {
                vector: {
                    dimension: 1536, // text-embedding-3-small has dimension 1536
                    metric: "cosine"
                }
            }
        }
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
