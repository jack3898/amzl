import { toBase64 } from '@amzl/utils/client/toBase64';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';

type FormProps = {
	children: React.ReactNode;
} & React.ComponentProps<'form'>;

export function Form({ children, ...rest }: FormProps) {
	const className = `${rest.className} grid gap-4`;

	return (
		<form {...rest} className={className}>
			{children}
		</form>
	);
}

type InputProps = {
	label: string;
	error?: string;
} & React.ComponentProps<'input'>;

export function Input({ label, error, ...rest }: InputProps) {
	return (
		<label>
			{label}{' '}
			{error && <small className="text-red-400 lowercase italic font-bold">{error}</small>}
			<br />
			<input {...rest} className="border rounded p-1" />
		</label>
	);
}

type FileProps = {
	label: string;
	allowedFiles?: string[];
	error?: string;
	base64Output?: (result: string) => void;
} & Omit<React.ComponentProps<'input'>, 'type'>;

export function File({ label, allowedFiles = [], error, base64Output, ...rest }: FileProps) {
	const ref = useRef<HTMLInputElement>(null);
	const id = `file-${label}`;

	return (
		<>
			<label>
				{label}{' '}
				{error && (
					<small className="text-red-400 lowercase italic font-bold">{error}</small>
				)}
				<br />
				<Button
					type="button"
					onClick={() => ref.current?.click()}
					text={<FontAwesomeIcon icon={faUpload} />}
				/>
			</label>
			<input
				{...rest}
				ref={ref}
				type="file"
				className="hidden"
				id={id}
				onChange={async (...event) => {
					rest.onChange?.(...event); // reimplement

					if (!base64Output) return;

					const [eventArg1] = event;
					const file = eventArg1.currentTarget.files?.[0];

					if (!file) {
						return void base64Output('');
					}

					const base64File = await toBase64(file);
					base64Output(base64File);
				}}
			/>
		</>
	);
}

type ButtonProps = {
	text: React.ReactNode;
} & React.ComponentProps<'button'>;

export function Button({ text, ...rest }: ButtonProps) {
	return (
		<button
			{...rest}
			className={`bg-zinc-500 px-3 py-2 text-white rounded ${
				rest.disabled ? 'cursor-not-allowed opacity-75' : ''
			}`}
		>
			{text}
		</button>
	);
}
