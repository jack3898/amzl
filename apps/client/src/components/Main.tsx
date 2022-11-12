import { Button, File, Form, Input } from '@amzl/react-components';
import { formikValidationSchema } from '@amzl/validation/form';
import { useFormik } from 'formik';
import { PreviewImg } from './PreviewImg';

export function Main() {
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
			console.log(values);
		},
		validationSchema: formikValidationSchema,
		validateOnMount: true
	});

	const allowedFileTypes: string[] = ['.png', '.jpg', '.jpeg'];

	return (
		<main>
			<Form
				className="max-w-xl w-full mx-auto bg-white p-4 border rounded shadow"
				onSubmit={handleSubmit}
			>
				<p>All fields are required.</p>
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
					type="file"
					allowedFiles={allowedFileTypes}
					base64Output={async (base64) => {
						setFieldValue('picfront', base64);
					}}
					error={errors.picfront}
				/>
				<PreviewImg src={values.picfront} caption="Front" />
				<File
					label="Driver side"
					type="file"
					base64Output={async (base64) => {
						setFieldValue('picdriver', base64);
					}}
					allowedFiles={allowedFileTypes}
					error={errors.picdriver}
				/>
				<PreviewImg src={values.picdriver} caption="Driver" />
				<File
					label="Passenger side"
					type="file"
					allowedFiles={allowedFileTypes}
					base64Output={async (base64) => {
						setFieldValue('picpassenger', base64);
					}}
					error={errors.picpassenger}
				/>
				<PreviewImg src={values.picpassenger} caption="Passenger" />
				<File
					label="Back"
					type="file"
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
					<Button text="Send" type="submit" disabled={!isValid} />
				</div>
			</Form>
		</main>
	);
}
