import dotenv from "dotenv";
import readline from "node:readline/promises";
import { GoogleGenAI } from "@google/genai";
import { GEMINI_RECIPE_SCHEMA, SAFEGUARD_PROMPT } from "./schema.js";
import { stdin as input, stdout as output } from "node:process";

const ENVIRONMENT_FILENAME = ".env.local";
dotenv.config({ path: ENVIRONMENT_FILENAME });


const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// GOOGLE GEMINI SCHEMA
async function main() {

    // Get user input
    const rl = readline.createInterface({ input, output });
    const userInput = await rl.question("Ask Gemini something: ");
    rl.close();

    // Generate structured response
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${SAFEGUARD_PROMPT}, User's question: ${userInput}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: GEMINI_RECIPE_SCHEMA
      },
    });
  
    console.log(response.text);
  }
  
  await main();