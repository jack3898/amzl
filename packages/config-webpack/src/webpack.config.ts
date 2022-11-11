import { NODE_MODULES_PATH, ROOT_ENV_PATH } from '@amzl/constants/node';
import { nodeEnv } from '@amzl/utils/node/rootenv';
import Dotenv from 'dotenv-webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration as WebpackConfig } from 'webpack';

const webpackConfig: WebpackConfig = {
	mode: nodeEnv,
	devtool: 'source-map',
	plugins: [new Dotenv({ path: ROOT_ENV_PATH })],
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		plugins: [new TsconfigPathsPlugin()] // So baseUrl in tsconfig works
	},
	resolveLoader: { modules: [NODE_MODULES_PATH] },
	performance: { hints: false },
	module: {
		rules: [
			{
				test: /\.ts?x?$/,
				use: [
					{
						loader: 'ts-loader',
						options: { transpileOnly: true }
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'file-loader',
				options: {
					name: 'assets/[hash].[ext]'
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['tailwindcss', 'autoprefixer']
							}
						}
					}
				]
			}
		]
	}
};

export default webpackConfig;
