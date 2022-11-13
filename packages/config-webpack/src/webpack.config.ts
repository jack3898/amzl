import { NODE_MODULES_PATH, ROOT_ENV_PATH } from '@amzl/constants/node';
import { nodeEnv } from '@amzl/utils/node/rootenv';
import Dotenv from 'dotenv-webpack';
import { Configuration as WebpackConfig } from 'webpack';

export const webpackConfig: WebpackConfig = {
	mode: nodeEnv,
	devtool: 'source-map',
	plugins: [new Dotenv({ path: ROOT_ENV_PATH })],
	resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
	resolveLoader: { modules: [NODE_MODULES_PATH] },
	performance: { hints: false }
};
