// This version of the file relies on webpack's dotenv plugin to resolve process.env
// If you would like to use these variables in a node environment import from `/node/rootenv` instead

export const server = new URL(process.env.SERVER!);
export const devClient = new URL(process.env.DEV_CLIENT!);
export const origin = new URL(process.env.ORIGIN!);
export const nodeEnv = process.env.NODE_ENV! as 'development' | 'production';
export const sendgridKey = process.env.SENDGRID_KEY!;
export const emailFrom = process.env.EMAIL_FROM!;
export const emailTo = process.env.EMAIL_TO!;
export const adminPass = process.env.ADMIN_PASS!;
