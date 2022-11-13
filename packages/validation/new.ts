import * as z from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

export const newValidationSchema = z.object({
	newbadgeid: z.string(),
	password: z.string()
});

export const newFormikValidationSchema = toFormikValidationSchema(newValidationSchema);
