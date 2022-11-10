import * as z from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

export const validationSchema = z.object({
	firstname: z.string(),
	lastname: z.string(),
	reg: z.string(),
	badgeid: z.string(),
	picfront: z.string().max(1_000_000, { message: 'File too large' }),
	picdriver: z.string().max(1_000_000, { message: 'File too large' }),
	picpassenger: z.string().max(1_000_000, { message: 'File too large' }),
	picback: z.string().max(1_000_000, { message: 'File too large' }),
	declaration: z.literal(true)
});

export const formikValidationSchema = toFormikValidationSchema(validationSchema);
