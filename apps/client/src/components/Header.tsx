import logo from '../assets/logo.png';

export function Header() {
	return (
		<header className="flex justify-center">
			<img src={logo} className="p-4 mix-blend-multiply contrast-200" />
		</header>
	);
}
