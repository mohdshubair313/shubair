import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { DataAPIClient } from "@datastax/astra-db-ts";
import fs from "fs";

async function checkCollection() {
    const endpoint = process.env.ASTRA_DB_ENDPOINT || "";
    const token = process.env.ASTRA_DB_APPLICATION || "";
    const collectionName = process.env.ASTRA_DB_COLLECTION || "embeddings";

    const client = new DataAPIClient(token);
    const db = client.db(endpoint);

    try {
        const collections = await db.listCollections();
        const info = collections.find(c => c.name === collectionName);
        if (info) {
            fs.writeFileSync("astra-collection-info.json", JSON.stringify(info, null, 2));
            console.log("Collection info saved to astra-collection-info.json");
        } else {
            console.log(`Collection "${collectionName}" not found.`);
        }
    } catch (error) {
        console.error("Error checking collection:", error);
    }
}

checkCollection();
