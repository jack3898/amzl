import { formRouter } from './procedures/form';
import { trpc } from './trpcInit';

export const trpcRouter = trpc.router({
	form: formRouter
});

export type TRPCRouter = typeof trpcRouter;
