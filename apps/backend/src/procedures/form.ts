import { procedure, trpc } from '../trpcInit';

export const formRouter = trpc.router({
	submit: procedure.query(async ({ ctx }) => {
		return { message: 'works', hasContext: await ctx.db.drivers.findMany() };
	})
});
