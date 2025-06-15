import dotenv from "dotenv";
import readline from "node:readline/promises";
import { GoogleGenAI } from "@google/genai";
import { stdin as input, stdout as output } from "node:process";

const ENVIRONMENT_FILENAME = ".env.local";
dotenv.config({ path: ENVIRONMENT_FILENAME });


const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function main() {
  const rl = readline.createInterface({ input, output });

  const userInput = await rl.question("Ask Gemini something: ");

  rl.close();

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: userInput,
  });

  console.log("\nGemini says:");
  console.log(response.text);
}

// wrap to avoid top-level await warning
(async () => {
  await main();
})();