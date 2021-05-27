import dotenv from 'dotenv';
import path from 'path';
import { URL } from 'url';

const __dirname = new URL('.', import.meta.url).pathname;

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
} = process.env;
export const AUTH_MODE = process.env.AUTH_MODE === 'true';
