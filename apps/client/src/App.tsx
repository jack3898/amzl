// @ts-ignore
import logo from './assets/logo.png';
import { Button, Form, Input } from './components/Form';

export function App() {
	return (
		<div className="grid gap-8 p-4">
			<header className="flex justify-center">
				<img src={logo} className="rounded border shadow bg-white p-4 max-w-xl" />
			</header>
			<main>
				<Form className="max-w-xl w-full mx-auto bg-white p-4 border rounded shadow">
					<Input label="First name" type="text" name="firstname" />
					<Input label="Last name" type="text" name="lastname" />
					<Input label="Vehicle registration" type="text" name="reg" />
					<Input label="Badge ID" type="text" name="badgeid" />
					<hr />
					<Input label="Front" type="file" name="picfront" />
					<Input label="Driver side" type="file" name="picdriver" />
					<Input label="Passenger side" type="file" name="picpassenger" />
					<Input label="Back" type="file" name="picback" />
					<hr />
					<Input label="I declare etc..." name="declaration" type="checkbox" />
					<div>
						<Button text="Send" />
					</div>
				</Form>
			</main>
			<footer></footer>
		</div>
	);
}
