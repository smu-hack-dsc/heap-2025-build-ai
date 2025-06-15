import { Type } from "@google/genai";

export const GEMINI_RECIPE_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        recipeName: {
            type: Type.STRING,
        },
        ingredients: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING,
          },
        },
        instructions: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING,
            }
        },
    },
        propertyOrdering: ["recipeName", "ingredients", "instructions"],
}

export const SAFEGUARD_PROMPT = "You are an API that only returns popular cooking recipes in JSON format. If the user's question is unrelated to food recipes, respond with an empty JSON array []."


export const GEMINI_WEATHER_SCHEMA = {
    type: Type.OBJECT,
        properties: {
            location: {
            type: Type.STRING,
            description: 'The city name, e.g. San Francisco',
            },
        },
    required: ['location'],
}