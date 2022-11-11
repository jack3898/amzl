import { toBase64 } from '@amzl/utils/client/toBase64';

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
} & React.ComponentProps<'input'>;

export function File({ label, allowedFiles = [], error, base64Output, ...rest }: FileProps) {
	return (
		<Input
			label={label}
			error={error}
			type="file"
			accept={allowedFiles.join(',')}
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
			{...rest}
		/>
	);
}

type ButtonProps = {
	text: string;
} & React.ComponentProps<'button'>;

export function Button({ text, ...rest }: ButtonProps) {
	return (
		<button {...rest} className="bg-slate-600 px-3 py-2 text-white rounded">
			{text}
		</button>
	);
}
