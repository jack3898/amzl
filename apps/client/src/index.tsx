import { TrpcProvider } from '@amzl/react-components';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';

function Main() {
	return (
		<TrpcProvider>
			<BrowserRouter>
				<Suspense>
					<App />
				</Suspense>
			</BrowserRouter>
		</TrpcProvider>
	);
}

ReactDOM.createRoot(document.querySelector('#app') as Element).render(<Main />);
