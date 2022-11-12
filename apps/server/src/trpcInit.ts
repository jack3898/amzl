import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import client from './prisma';

export type Context = inferAsyncReturnType<typeof createContext>;

export const trpc = initTRPC.context<Context>().create();
export const procedure = trpc.procedure;
export const createContext = () => ({ db: client });
