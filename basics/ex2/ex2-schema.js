// DO NOT TOUCH

import { Type } from "@google/genai";

export const GEMINI_WEATHER_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    location: {
      type: Type.STRING,
      description: "The city name, e.g. Tokyo",
    },
  },
  required: ["location"],
};

export const GEMINI_EXCHANGE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    fromCurrency: {
      type: Type.STRING,
      description: "The currency to convert from, e.g. USD",
    },
    toCurrency: {
      type: Type.STRING,
      description: "The currency to convert to, e.g. GBP",
    },
  },
  required: ["fromCurrency", "toCurrency"],
};

export const GEMINI_JOKE_SCHEMA = {
  type: Type.OBJECT,
  properties: {},
};
