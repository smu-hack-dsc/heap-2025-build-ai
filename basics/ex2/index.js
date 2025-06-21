import axios from "axios";
import dotenv from "dotenv";
import readline from "node:readline/promises";
import { GoogleGenAI } from "@google/genai";
import { stdin as input, stdout as output } from "node:process";
import { GEMINI_WEATHER_SCHEMA, GEMINI_EXCHANGE_SCHEMA, GEMINI_JOKE_SCHEMA } from "./ex2-schema.js";

const ENVIRONMENT_FILENAME = "../.env.local";
dotenv.config({ path: ENVIRONMENT_FILENAME });

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Function implementations [DO NOT TOUCH]
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

    const bestMatch = results.sort(
      (a, b) => (b.importance || 0) - (a.importance || 0)
    )[0];
    const { lat, lon } = bestMatch;
    return { lat, lon };
  } catch (error) {
    console.error("Geocoding error:", error.message);
    return null;
  }
}

async function getTemperature(location) {
  const coords = await geocodeLocation(location);
  if (!coords) return null;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;

  try {
    const response = await axios.get(url);
    return response.data.current_weather.temperature;
  } catch (error) {
    console.error("Weather API error:", error.message);
    return null;
  }
}

async function getExchangeRate(from, to) {
  const url = `https://api.apilayer.com/exchangerates_data/latest?symbols=${to}&base=${from}`;

  const myHeaders = new Headers();
  myHeaders.append("apikey", process.env.EXCHANGE_RATE_API_KEY);

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data.rates[to];
  } catch (error) {
    console.error("Exchange API error:", error.message);
    return null;
  }
}

async function getRandomJoke() {
  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    return `${response.data.setup} ${response.data.punchline}`;
  } catch (error) {
    console.error("Joke API error:", error.message);
    return null;
  }
}

// Part 1: Function declarations for Gemini
// FORMAT : {
//     name: <name>, --> see dispatchFunctionCall
//     description: "Eg: Gets the current temperature for a given location.",
//     parameters: <schema from ./ex2-schema.js,
//   },

const functionDeclarations = [
  {
    name: "get_current_temperature",
    description: "Gets the current temperature for a given location.",
    parameters: GEMINI_WEATHER_SCHEMA,
  },
  {
    name: "get_exchange_rate",
    description: "Gets the exchange rate from one currency to another.",
    parameters: GEMINI_EXCHANGE_SCHEMA,
  },
  {
    name: "get_random_joke",
    description: "Gets a random joke.",
    parameters: GEMINI_JOKE_SCHEMA,
  },
];

// Part 2: Dispatcher
async function dispatchFunctionCall(name, args) {
  switch (name) {
    case "get_current_temperature":
      const temperature = await getTemperature(args.location);
      return temperature
        ? `Current temperature in ${args.location} is ${temperature}°C.`
        : `Couldn't fetch temperature for ${args.location}.`;
    case "get_exchange_rate":
      const rate = await getExchangeRate(args.fromCurrency, args.toCurrency);
      return rate
        ? `Current exchange rate from ${args.fromCurrency} to ${args.toCurrency} is ${rate}.`
        : `Couldn't fetch exchange rate for ${args.fromCurrency} to ${args.toCurrency}.`;
    case "get_random_joke":
      const joke = await getRandomJoke();
      return joke ? joke : "Couldn't fetch a joke right now.";
    default:
      return "Unknown function call.";
  }
}

// Main CLI loop [DO NOT TOUCH]
async function main() {
  const rl = readline.createInterface({ input, output });

  while (true) {
    const userInput = await rl.question("Ask Gemini something (or type 'exit'): ");

    if (userInput.toLowerCase() === "exit") {
      console.log("Goodbye!");
      break;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: userInput }] }],
      config: {
        tools: [{ functionDeclarations }],
      },
    });

    if (response.functionCalls) {
      const { name, args } = response.functionCalls[0];
      console.log(`\nGemini wants to call: ${name}`);
      const result = await dispatchFunctionCall(name, args);
      console.log(result + "\n");
    } else {
      console.log("Gemini says: " + response.candidates[0]?.content?.parts[0].text + "\n");
    }
  }

  rl.close();
}

await main();
