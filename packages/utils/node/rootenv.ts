import { ROOT } from '@amzl/constants/node';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Automatically update node's `process.env` with environment variables found at the root `.env`
 */
dotenv.config({ path: path.resolve(ROOT, '.env') });

export const server = new URL(process.env.SERVER!);
export const client = new URL(process.env.CLIENT!);
export const nodeEnv = process.env.NODE_ENV! as 'development' | 'production';
