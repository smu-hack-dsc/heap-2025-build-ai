import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "node:fs";

const ENVIRONMENT_FILENAME = "../.env.local";
dotenv.config({ path: ENVIRONMENT_FILENAME });

const app = express();
const PORT = 3000;
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Middleware
app.use(express.static("public"));
app.use(express.json());

app.post("/generate-image", async (req, res) => {
  console.log("Generate image function invoked")
  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ success: false, message: "Prompt is required" });

  try {
    console.log("Generating image....")
    const contents = [{ text: prompt }];

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: contents,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const generatedImageData = part.inlineData.data;
        const buffer = Buffer.from(generatedImageData, "base64");
        fs.writeFileSync("public/generated-image.png", buffer);
        console.log("Image saved as public/generated-image.png");
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error generating image:", error.message);
    res.status(500).json({ success: false, message: "Failed to generate image." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
