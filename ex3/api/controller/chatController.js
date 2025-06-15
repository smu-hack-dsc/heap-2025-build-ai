import { config } from '../config/index.js';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: config.geminiAPIToken })

// EXERCISE 3 CHALLENGE!
// Refactor getGeminiCompletion such that you are able to store the conversation in memory during the session 
// HINT: You can store messages as an array and do something with it hehe

export const getGeminiChatCompletion = async (req, res) => {
    // Exercise 3 part 1c
    // Extract the userPrompt from the request body. If no prompt is provided, return a 400 error with a message: "No prompt given " 
    // TODO

    try {
        // Add the user's message to chatHistory as a {role: "user"} object
        // TODO 

        // Extract the AI’s reply text from the response.
        // TODO  

        // Send the AI’s reply back to the frontend as a JSON response.
        res.json({reply}) 
        
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Failed to get Gemini response" })
    }
}