import * as z from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

export const manageValidationSchema = z.object({
	badgeid: z.string(),
	password: z.string()
});

export const manageFormikValidationSchema = toFormikValidationSchema(manageValidationSchema);
