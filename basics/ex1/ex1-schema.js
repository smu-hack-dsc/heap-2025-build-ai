import { Type } from "@google/genai";

// RECIPE SCHEMA
export const RECIPE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    // TODO
  },
  propertyOrdering: ["recipeName", "ingredients", "instructions"],
};

// TRAVEL SCHEMA
export const TRAVEL_SCHEMA = {
  // TODO
};

// MOVIE SCHEMA
export const MOVIE_SCHEMA = {
  // TODO
};

// SAFEGUARD PROMPTS [DO NOT TOUCH]
export const CLASSIFY_PROMPT = `Classify the following question into one of these categories: "recipe", "travel", "movie", or "other". Return ONLY the category string.`;

export const RECIPE_PROMPT = `You are an API that returns popular cooking recipes in JSON format. Respond strictly in JSON according to the given schema.`;

export const TRAVEL_PROMPT = `You are an API that returns popular tourist destinations for a given country in JSON format. Respond strictly in JSON according to the given schema.`;

export const MOVIE_PROMPT = `You are an API that returns popular movie details and main cast in JSON format. Respond strictly in JSON according to the given schema.`;
