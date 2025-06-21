import express from 'express';
// Exercise 3 part 1a:
// Import getGeminiChatCompletion controller function that handles Gemini chat completions
// TODO
import { getGeminiChatCompletion } from '../controller/chatController.js';
// Create an express router instance
// TODO
const router = express.Router();
// Define a POST route at /gemini-chat that uses the imported controller as the handler.
// TODO
router.post('/gemini-chat', getGeminiChatCompletion);
// This enables router to be mounted in the main file 
export default router;