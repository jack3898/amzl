import { Footer, Header, Main } from './components';
import { QueryTest } from './components/QueryTest';

export function App() {
	return (
		<div className="grid gap-8 p-4">
			<Header />
			<Main />
			<Footer />
			<QueryTest />
		</div>
	);
}
