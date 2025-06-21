import dotenv from "dotenv";
import readline from "node:readline/promises";
import { GoogleGenAI } from "@google/genai";
import { stdin as input, stdout as output } from "node:process";
import {
  RECIPE_SCHEMA,
  TRAVEL_SCHEMA,
  MOVIE_SCHEMA,
  CLASSIFY_PROMPT,
  RECIPE_PROMPT,
  TRAVEL_PROMPT,
  MOVIE_PROMPT,
} from "./ex1-schema.js";

const ENVIRONMENT_FILENAME = "../.env.local";
dotenv.config({ path: ENVIRONMENT_FILENAME });

if (!process.env.API_KEY) {
  console.error("❌ API_KEY not found in .env.local");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// [DO NOT TOUCH]
async function classifyQuestion(question) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `${CLASSIFY_PROMPT}\nQuestion: ${question}`,
  });
  return response.text.trim().toLowerCase();
}
// [DO NOT TOUCH]
async function generateStructuredResponse(prompt, schema, question) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `${prompt}\nUser's question: ${question}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });
  return response.text;
}

async function main() {
  const rl = readline.createInterface({ input, output });
  const userInput = await rl.question("Ask Gemini something: ");
  rl.close();

  const category = await classifyQuestion(userInput);
  console.log(`\n📊 Detected category: ${category}`);

  let result;

  switch (category) {
    case "recipe":
      result = await generateStructuredResponse(RECIPE_PROMPT, RECIPE_SCHEMA, userInput);
      break;
    case "travel":
      result = await generateStructuredResponse(TRAVEL_PROMPT, TRAVEL_SCHEMA, userInput);
      break;
    case "movie":
      result = await generateStructuredResponse(MOVIE_PROMPT, MOVIE_SCHEMA, userInput);
      break;
    default:
      result = "{}";
  }

  console.log("\n📦 JSON Output:\n");
  console.log(result);
}

await main();
