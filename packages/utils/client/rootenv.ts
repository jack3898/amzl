// This version of the file relies on webpack's dotenv plugin to resolve process.env
// If you would like to use these variables in a node environment import from `/node/rootenv` instead

export const server = new URL(process.env.SERVER!);
export const client = new URL(process.env.CLIENT!);
export const nodeEnv = process.env.NODE_ENV! as 'development' | 'production';
