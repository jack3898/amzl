import { Configuration as DevServerConfig } from 'webpack-dev-server';

export const devServerConfig: DevServerConfig = {
	static: { directory: 'assets' },
	hot: true,
	historyApiFallback: true
};
