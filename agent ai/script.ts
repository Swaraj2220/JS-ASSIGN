import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OllamaEmbeddings } from "@langchain/ollama";

// Load PDF
const loader = new PDFLoader("ATM Simulation System.pdf");
const docs = await loader.load();

// Split text into chunks
const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
});

// Embedding model
const embeddingModel = new OllamaEmbeddings({
    model: "", // add your model name here
});