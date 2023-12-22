import * as z from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const maxMb = 8;
const fileSize = maxMb * 1000 * 1000 * 1.37; // rough estimate
const fileTooBigMsg = `File too large (max ${maxMb}mb)`;
const numplateRegex =
	/(^[A-Z]{2}[0-9]{2} [A-Z]{3}$)|(^[A-Z][0-9]{1,3} [A-Z]{3}$)|(^[A-Z]{3} [0-9]{1,3}[A-Z]$)|(^[0-9]{1,4} [A-Z]{1,2}$)|(^[0-9]{1,3} [A-Z]{1,3}$)|(^[A-Z]{1,2} [0-9]{1,4}$)|(^[A-Z]{1,3} [0-9]{1,3}$)/gim;

export const formValidationSchema = z.object({
	firstname: z.string(),
	lastname: z.string(),
	reg: z.string().regex(numplateRegex),
	badgeid: z.string(),
	picfront: z.string().max(fileSize, { message: fileTooBigMsg }),
	picdriver: z.string().max(fileSize, { message: fileTooBigMsg }),
	picdriverFront: z.string().max(fileSize, { message: fileTooBigMsg }),
	picpassenger: z.string().max(fileSize, { message: fileTooBigMsg }),
	picpassengerFront: z.string().max(fileSize, { message: fileTooBigMsg }),
	picback: z.string().max(fileSize, { message: fileTooBigMsg }),
	declaration: z.literal(true)
});

export const formFormikValidationSchema = toFormikValidationSchema(formValidationSchema);
