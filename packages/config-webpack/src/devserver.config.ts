import { Configuration as DevServerConfig } from 'webpack-dev-server';

const devServerConfig: DevServerConfig = {
	static: { directory: 'assets' },
	hot: true,
	historyApiFallback: true
};

export default devServerConfig;
