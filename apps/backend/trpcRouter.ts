import { formRouter } from './src/procedures/form';
import { trpc } from './src/trpcInit';

export const trpcRouter = trpc.router({
	form: formRouter
});

export type TRPCRouter = typeof trpcRouter;
