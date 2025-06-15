// YOU DO NOT NEED TO TOUCH THIS FILE

import dotenv from 'dotenv';

const ENVIRONMENT_FILENAME = ".env.local";
dotenv.config({ path: ENVIRONMENT_FILENAME });

export const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    rateLimitWindow: process.env.RATE_LIMIT_WINDOW || 1 * 60 * 1000, 
    rateLimitMax: process.env.RATE_LIMIT_MAX || 1000,
    geminiAPIToken: process.env.API_KEY, 
};