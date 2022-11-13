import { bundler, errorHandler, webpackConfig } from '@amzl/config-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export const webpackClientConfig: Parameters<typeof bundler>[0] = {
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	plugins: [
		...(webpackConfig.plugins || []),
		new HtmlWebpackPlugin({ template: path.resolve('src', 'index.html') })
	],
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

bundler(webpackClientConfig).run(errorHandler);
