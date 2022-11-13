type MainProps = {
	children: React.ReactNode;
};

export function Main({ children }: MainProps) {
	return <main className="flex-1">{children}</main>;
}
