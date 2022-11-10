import logo from '../assets/logo.png';

export function Header() {
	return (
		<header className="flex justify-center">
			<img src={logo} className="rounded border shadow bg-white p-4 max-w-xl" />
		</header>
	);
}
