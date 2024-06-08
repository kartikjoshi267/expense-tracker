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

// export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || throwExpression();

// export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || throwExpression();

// export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || throwExpression();