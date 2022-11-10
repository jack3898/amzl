import { Button, File, Form, Input } from '@amzl/react-components/Form';
import { formikValidationSchema } from '@amzl/validation/form';
import { useFormik } from 'formik';

export function Main() {
	const { getFieldProps, handleSubmit, setFieldValue, errors } = useFormik({
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
		validationSchema: formikValidationSchema
	});

	const allowedFileTypes: string[] = ['.png', '.jpg', '.jpeg'];

	return (
		<main>
			<Form
				className="max-w-xl w-full mx-auto bg-white p-4 border rounded shadow"
				onSubmit={handleSubmit}
			>
				<p>All fields are required</p>
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
				<File
					label="Driver side"
					type="file"
					base64Output={async (base64) => {
						setFieldValue('picdriver', base64);
					}}
					allowedFiles={allowedFileTypes}
					error={errors.picdriver}
				/>
				<File
					label="Passenger side"
					type="file"
					allowedFiles={allowedFileTypes}
					base64Output={async (base64) => {
						setFieldValue('picpassenger', base64);
					}}
					error={errors.picpassenger}
				/>
				<File
					label="Back"
					type="file"
					base64Output={async (base64) => {
						setFieldValue('picback', base64);
					}}
					allowedFiles={allowedFileTypes}
					error={errors.picback}
				/>
				<hr />
				<Input
					label="I declare etc..."
					type="checkbox"
					{...getFieldProps('declaration')}
					error={errors.declaration ? 'required' : ''}
				/>
				<div>
					<Button text="Send" type="submit" />
				</div>
			</Form>
		</main>
	);
}
