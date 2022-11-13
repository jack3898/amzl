import { bundler, errorHandler } from '@amzl/config-webpack';
import path from 'path';

/**
 * Unfortunately, this monorepo has pure typescript packages
 * which is great for development, but pm2 daemon works best with js.
 * Even when you use tsc, the js output will still try to import ts files which fails.
 * This will bundle and compile all packages to a single js file for pm2 to use.
 */

export const webpackBackendConfig: Parameters<typeof bundler>[0] = {
	entry: './src/distserver.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	target: 'node',
	externalsPresets: {
		node: true
	},
	externals: {
		sharp: 'commonjs sharp',
		'@prisma/client': 'commonjs @prisma/client'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'ts-loader',
						options: { transpileOnly: true }
					}
				]
			}
		]
	}
};

bundler(webpackBackendConfig).run(errorHandler);
