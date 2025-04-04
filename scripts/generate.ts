import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getEmbeddingsCollection, getvectorStore } from "../src/lib/astradb";

async function GenerateEmbeddings() {
    const vectorStore = await getvectorStore();

    {(await getEmbeddingsCollection()).dropCollection("collectionName")}
    
  const loader = new DirectoryLoader(
    "src/app/",
    {
      ".tsx": (path) => new TextLoader(path),
    },
    true
  );

  const loadedDocs = await loader.load();
  const docs = loadedDocs.filter(doc => doc.metadata.source.endsWith("page.tsx"));

  const filteredDocs = docs.map((doc) => {
    const url = doc.metadata.source
      .replace(/\\/g, "/")
      .split("/src/app/")[1]
      .split("/page.")[0] || "/";

      const pageContentTrimmed = doc.pageContent.replace(/^import.*$/gm, "") //remove import statements
      .replace(/ className=(["'])(.*?)\1/g, "") //remove className attributes
      .replace(/^\s*[\r]/gm, "") //remove style attributes
      .trim(); //remove empty lines

    return new Document({
      pageContent: pageContentTrimmed,
      metadata: { url },
    });
  });

  const splitter = RecursiveCharacterTextSplitter.fromLanguage("html");

  const splitDocs = await splitter.splitDocuments(filteredDocs);

  await vectorStore.addDocuments(splitDocs)
}

// Call the GenerateEmbeddings function
GenerateEmbeddings();
