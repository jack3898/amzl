import * as z from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const maxMb = 8;
const fileSize = maxMb * 1000 * 1000 * 1.37; // rough estimate
const fileTooBigMsg = `File too large (max ${maxMb}mb)`;

export const formValidationSchema = z.object({
	firstname: z.string(),
	lastname: z.string(),
	reg: z.string(),
	badgeid: z.string(),
	picfront: z.string().max(fileSize, { message: fileTooBigMsg }),
	picdriver: z.string().max(fileSize, { message: fileTooBigMsg }),
	picpassenger: z.string().max(fileSize, { message: fileTooBigMsg }),
	picback: z.string().max(fileSize, { message: fileTooBigMsg }),
	declaration: z.literal(true)
});

export const formFormikValidationSchema = toFormikValidationSchema(formValidationSchema);
