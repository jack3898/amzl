import { validationSchema } from '@amzl/validation/form';
import { TRPCError } from '@trpc/server';
import { procedure, trpc } from '../trpcInit';

export const formRouter = trpc.router({
	submit: procedure.input(validationSchema).mutation(async ({ ctx, input }) => {
		const driver = await ctx.db.drivers.findFirst({
			where: { badgeId: input.badgeid }
		});

		if (!driver) {
			throw new TRPCError({ code: 'FORBIDDEN', message: 'Badge ID not found.' });
		}

		const now = new Date();
		const allowedAt = driver.submittedAt.getTime() + 2.16e7; // 6 hours in the future

		if (now.getTime() < allowedAt) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'A submission has already been recorded in the last 6 hours.'
			});
		}

		await ctx.db.drivers.update({
			where: { badgeId: input.badgeid },
			data: { submittedAt: now }
		});
	})
});
