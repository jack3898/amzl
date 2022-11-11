import { ROOT_ENV_PATH } from '@amzl/constants/node';
import dotenv from 'dotenv';

// Automatically update node's `process.env` with environment variables found at the root `.env`

dotenv.config({ path: ROOT_ENV_PATH });

export * from '../client/rootenv';
