import axios from "axios";
import dotenv from "dotenv";
import readline from "node:readline/promises";
import { GoogleGenAI } from "@google/genai";
import { GEMINI_WEATHER_SCHEMA } from "./schema.js";
import { stdin as input, stdout as output } from "node:process";

const ENVIRONMENT_FILENAME = ".env.local";
dotenv.config({ path: ENVIRONMENT_FILENAME });


const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const weatherFunctionDeclaration = {
    name: 'get_current_temperature',
    description: 'Gets the current temperature for a given location.',
    parameters: GEMINI_WEATHER_SCHEMA,
};

async function geocodeLocation(location) {
    const apiKey = process.env.GEOCODE_API_KEY;
    const url = `https://geocode.maps.co/search?q=${encodeURIComponent(location)}&api_key=${apiKey}`;
  
    try {
      const response = await axios.get(url);
      const results = response.data;
  
      if (!results || results.length === 0) {
        console.error("No geocoding results found.");
        return null;
      }
  
      // Prioritize the most relevant result (highest importance)
      const bestMatch = results
        .sort((a, b) => (b.importance || 0) - (a.importance || 0))[0];
  
      const { lat, lon, display_name } = bestMatch;
  
      console.log(`Best Match: ${display_name}`);
      console.log(`Lat: ${lat}, Lon: ${lon}`);
  
      return { lat, lon };
    } catch (error) {
      console.error("Geocoding error:", error.message);
      return null;
    }
  }

async function resolveWeather(location) {
    const coords = await geocodeLocation(location);
    if (!coords) return null;
  
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;
  
    try {
        const response = await axios.get(url);
        const temperature = response.data.current_weather.temperature;
        return temperature;
    } catch (error) {
        console.error("Weather API error:", error.message);
        return null;
    }
}

async function main() {

    // Get user input
    const rl = readline.createInterface({ input, output });
    const userInput = await rl.question("Ask Gemini something: ");
    rl.close();

    // Generate structured response
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ 
            role: "user", parts: [{ text: userInput }]
        }],
      config: {
        tools: [{
            functionDeclarations: [weatherFunctionDeclaration]
          }],
      },
    });

    // console.dir(response, { depth: null }); -> To see full Gemini output response
    // console.log(response.functionCalls);    -> To see function call response

    if (response.functionCalls) {
      const { name, args } = response.functionCalls[0];
      if (name === "get_current_temperature") {           
        const { location } = args;
        console.log(`\nGemini wants to get the temperature for: ${location}`);
      
        const temperature = await resolveWeather(location);
        if (temperature !== null) {
          console.log(`Gemini says: Current temperature in ${location} is ${temperature}°C\n`);
        } else {
          console.log(`Couldn't fetch temperature for ${location}.\n`);
        }
      }
    } else {
      console.log(`Gemini says: ${response.candidates[0]?.content?.parts[0].text}`)
    }      
}
    
await main();