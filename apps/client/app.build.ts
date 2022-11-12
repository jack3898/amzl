import { bundler, errorHandler, webpackConfig } from '@amzl/config-webpack';
import { ROOT } from '@amzl/constants/node';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export const webpackClientConfig: Parameters<typeof bundler>[0] = {
	output: {
		path: path.resolve(ROOT, 'dist', 'client'),
		filename: 'bundle.js'
	},
	plugins: [
		...(webpackConfig.plugins || []),
		new HtmlWebpackPlugin({ template: path.resolve('src', 'index.html') })
	]
};

bundler(webpackClientConfig).run(errorHandler);
