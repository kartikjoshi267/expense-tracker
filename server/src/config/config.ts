import dotenv from 'dotenv';
dotenv.config();

const throwExpression = () => {
  throw new Error('Environment variable not set');
}

export const MONGODB_URI = process.env.MONGODB_URI || throwExpression();

export const SALT_ROUND = process.env.SALT_ROUND || 10;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || throwExpression();

export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || throwExpression();

export const FRONTEND_URL = process.env.FRONTEND_URL || throwExpression();