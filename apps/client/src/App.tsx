import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Footer, Header } from './components';

const Home = lazy(() => import('./pages/Home'));
const Manage = lazy(() => import('./pages/Manage'));

export function App() {
	return (
		<div className="flex flex-col gap-8 p-4 min-h-screen bg-zinc-50">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/manage" element={<Manage />} />
			</Routes>
			<Footer />
		</div>
	);
}
