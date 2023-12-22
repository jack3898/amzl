import { adminPass, emailFrom, emailTo } from '@amzl/utils/client/rootenv';
import { sendgrid } from '@amzl/utils/node/sendgrid';
import { formValidationSchema } from '@amzl/validation/form';
import { manageValidationSchema } from '@amzl/validation/manage';
import { TRPCError } from '@trpc/server';
import { format } from 'date-fns';
import sharp from 'sharp';
import { procedure, trpc } from '../trpcInit';

export const formRouter = trpc.router({
	submit: procedure.input(formValidationSchema).mutation(async ({ ctx, input }) => {
		const driver = await ctx.db.drivers.findFirst({
			where: { badgeId: input.badgeid }
		});

		if (!driver) {
			throw new TRPCError({ code: 'FORBIDDEN', message: 'Badge ID not found' });
		}

		const now = new Date();
		const allowedAt = driver.submittedAt.getTime() + 2.16e7; // 6 hours in the future

		if (now.getTime() < allowedAt) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'A submission has already been recorded in the last 6 hours'
			});
		}

		const imageProcessing = [
			{ name: 'picfront', base64: input.picfront },
			{ name: 'picdriver', base64: input.picdriver },
			{ name: 'picpassenger', base64: input.picpassenger },
			{ name: 'picback', base64: input.picback },
			{ name: 'picdriverFront', base64: input.picdriverFront },
			{ name: 'picpassengerFront', base64: input.picpassengerFront }
		].map(async ({ name, base64: base64Url }) => {
			const base64 = base64Url.split(';base64,').pop();
			const buffer = await sharp(Buffer.from(base64!, 'base64'))
				.jpeg({ quality: 50 })
				.toBuffer();

			return { name, processedBase64: buffer.toString('base64') };
		});

		const processedImages = await Promise.all(imageProcessing);
		const nowReadable = format(now, 'dd/MM/yyyy HH:mm');

		await sendgrid.send({
			to: emailTo,
			from: emailFrom,
			subject: `${nowReadable} new vehicle photos - (${driver.badgeId}, ${input.reg})`,
			text: `New vehicle pictures for driver ${input.firstname} ${input.lastname} (badge: ${driver.badgeId}, reg: ${input.reg}). Check attached.`,
			attachments: processedImages.map(({ name, processedBase64 }) => ({
				filename: `${name} ${nowReadable}.jpg`,
				content: processedBase64,
				type: 'image/jpeg',
				disposition: 'attachment'
			}))
		});

		await ctx.db.drivers.update({
			where: { badgeId: input.badgeid },
			data: { submittedAt: now }
		});
	}),
	new: procedure.input(manageValidationSchema).mutation(async ({ ctx, input }) => {
		if (input.password !== adminPass) {
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		}

		await ctx.db.drivers.upsert({
			where: { badgeId: input.badgeid },
			update: { badgeId: input.badgeid, submittedAt: new Date(0) },
			create: { badgeId: input.badgeid, submittedAt: new Date(0) }
		});
	})
});
