import dotenv from 'dotenv';
import path from 'path';
import { ConnectionOptions } from 'typeorm';
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from './config';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export default {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT!, 10),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  // synchronize: true,
  logging: true,
  entities: ['src/resources/**/*.model.ts'],
  migrations: ['src/migrations/**/*.ts'],
  migrationsRun: true,
} as ConnectionOptions;
