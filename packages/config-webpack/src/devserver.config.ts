import { rootenv } from '@amzl/utils/node/rootenv';
import { Configuration as DevServerConfig } from 'webpack-dev-server';

rootenv();

const devServerConfig: DevServerConfig = {
	static: { directory: 'assets' },
	hot: true,
	historyApiFallback: true
};

export default devServerConfig;
