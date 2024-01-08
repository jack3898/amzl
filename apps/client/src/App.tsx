import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Footer, Header } from './components';

const Home = lazy(() => import('./pages/Home'));
const Manage = lazy(() => import('./pages/Manage'));
const NotFound = lazy(() =>  import('./pages/NotFound'));

export function App() {
	document.title = process.env.TITLE ?? 'Undefined';

	return (
		<div className="flex flex-col gap-8 p-4 min-h-screen bg-zinc-50">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/manage" element={<Manage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</div>
	);
}
