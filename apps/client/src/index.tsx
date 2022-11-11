import { TrpcProvider } from '@amzl/react-components';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

function Main() {
	return (
		<TrpcProvider>
			<App />
		</TrpcProvider>
	);
}

ReactDOM.createRoot(document.querySelector('#app') as Element).render(<Main />);
