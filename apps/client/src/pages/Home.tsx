import { Button, File, Form, Input, trpcContext } from '@amzl/react-components';
import { formFormikValidationSchema } from '@amzl/validation/form';
import { useFormik } from 'formik';
import { Main } from '../components';
import { PreviewImg } from '../components/PreviewImg';

export default function Home() {
	const formMutation = trpcContext.form.submit.useMutation();

	const { getFieldProps, handleSubmit, setFieldValue, values, errors, isValid } = useFormik({
		initialValues: {
			firstname: '',
			lastname: '',
			reg: '',
			badgeid: '',
			picfront: '',
			picdriver: '',
			picpassenger: '',
			picback: '',
			declaration: false
		},
		onSubmit(values) {
			return formMutation.mutateAsync({ ...values, declaration: true });
		},
		validationSchema: formFormikValidationSchema,
		validateOnMount: true
	});

	const allowedFileTypes = ['.png', '.jpg', '.jpeg'];

	return (
		<Main>
			<Form
				className="max-w-xl w-full mx-auto bg-white p-4 border rounded shadow"
				onSubmit={handleSubmit}
			>
				<p>
					<strong>
						You may only send ONE submission every 6 hours, so please double check your
						information before you send it.
					</strong>
				</p>
				<hr />
				<Input
					label="First name"
					type="text"
					{...getFieldProps('firstname')}
					error={errors.firstname}
				/>
				<Input
					label="Last name"
					type="text"
					{...getFieldProps('lastname')}
					error={errors.lastname}
				/>
				<Input
					label="Vehicle registration"
					type="text"
					{...getFieldProps('reg')}
					error={errors.reg}
				/>
				<Input
					label="Badge ID"
					type="text"
					{...getFieldProps('badgeid')}
					error={errors.badgeid}
				/>
				<hr />
				<File
					label="Front"
					allowedFiles={allowedFileTypes}
					base64Output={async (base64) => {
						setFieldValue('picfront', base64);
					}}
					error={errors.picfront}
				/>
				<PreviewImg src={values.picfront} caption="Front" />
				<File
					label="Driver side"
					base64Output={async (base64) => {
						setFieldValue('picdriver', base64);
					}}
					allowedFiles={allowedFileTypes}
					error={errors.picdriver}
				/>
				<PreviewImg src={values.picdriver} caption="Driver" />
				<File
					label="Passenger side"
					allowedFiles={allowedFileTypes}
					base64Output={async (base64) => {
						setFieldValue('picpassenger', base64);
					}}
					error={errors.picpassenger}
				/>
				<PreviewImg src={values.picpassenger} caption="Passenger" />
				<File
					label="Back"
					base64Output={async (base64) => {
						setFieldValue('picback', base64);
					}}
					allowedFiles={allowedFileTypes}
					error={errors.picback}
				/>
				<PreviewImg src={values.picback} caption="Back" />
				<hr />
				<Input
					label="I confirm the images taken of the vehicle represent the true condition and I will be held accountable for any damages that are not captured in the images taken during this inspection"
					type="checkbox"
					{...getFieldProps('declaration')}
					error={errors.declaration ? 'required' : ''}
				/>
				<div>
					<Button
						text={formMutation.isLoading ? 'Sending...' : 'Send'}
						type="submit"
						disabled={!isValid || formMutation.isLoading}
					/>
					{formMutation.failureReason && (
						<p className="text-red-400">{formMutation.failureReason?.message}</p>
					)}
					{formMutation.isSuccess && <p className="text-green-400">Success!</p>}
				</div>
			</Form>
		</Main>
	);
}
