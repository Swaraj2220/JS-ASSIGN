import "dotenv/config";

import { createAgent } from "langchain";
import { ChatOpenAI } from "@langchain/openai";
import { TavilySearchResults } from "@langchain/tavily";
import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";

// Search tool
const searchTool = new TavilySearchResults({
    maxResults: 2,
});

// Wikipedia tool
const wikiTool = new WikipediaQueryRun({
    topKResults: 3,
});

// LLM configuration
const llm = new ChatOpenAI({
    model: "google/gemini-2.0-flash-001",
    configuration: {
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY,
    },
});

// Agent
const agent = createAgent({
    model: llm,
    tools: [searchTool, wikiTool],
});

// Run function
async function run() {
    try {
        const result = await agent.invoke({
            messages: "history of mumbai",
        });

        console.log(result.messages.at(-1)?.content);
    } catch (err) {
        console.error("Agent error:", err);
    }
}

run();