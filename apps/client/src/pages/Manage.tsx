import { Button, Form, Input, trpcContext } from '@amzl/react-components';
import { newFormikValidationSchema } from '@amzl/validation/new';
import { useFormik } from 'formik';
import { Main } from '../components';

export default function Manage() {
	const newMutation = trpcContext.form.new.useMutation();

	const { getFieldProps, handleSubmit, errors, isValid } = useFormik({
		initialValues: {
			newbadgeid: '',
			password: ''
		},
		onSubmit(input) {
			return newMutation.mutateAsync(input);
		},
		validationSchema: newFormikValidationSchema,
		validateOnMount: true
	});

	return (
		<Main>
			<Form
				className="max-w-xl w-full mx-auto bg-white p-4 border rounded shadow"
				onSubmit={handleSubmit}
			>
				<p>
					<strong>
						A new driver ID will be saved if one does not exist. If a driver does exist,
						their 6 hour timer will be reset.
					</strong>
				</p>
				<hr />
				<Input
					label="Badge ID"
					type="text"
					{...getFieldProps('newbadgeid')}
					error={errors.newbadgeid}
				/>
				<Input
					label="Password"
					type="password"
					{...getFieldProps('password')}
					error={errors.password}
				/>
				<div>
					<Button
						text={newMutation.isLoading ? 'Applying...' : 'Apply'}
						type="submit"
						disabled={!isValid || newMutation.isLoading}
					/>
					{newMutation.failureReason && (
						<p className="text-red-400">{newMutation.failureReason?.message}</p>
					)}
					{newMutation.isSuccess && (
						<p className="text-green-400">New driver created/updated!</p>
					)}
				</div>
			</Form>
		</Main>
	);
}
