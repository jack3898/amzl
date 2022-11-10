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
} & React.ComponentProps<'input'>;

export function Input({ children, label, ...rest }: InputProps) {
	return (
		<label>
			{label}
			<br />
			<input {...rest} className="border rounded p-1" />
		</label>
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
