import { bundler, errorHandler } from '@amzl/config-webpack';
import path from 'path';

/**
 * Unfortunately, this monorepo has pure typescript packages
 * which is great for development, but pm2 daemon works best with js.
 * Even when you use tsc, the js output will still try to import ts files which fails.
 * This will bundle and compile all packages to a single js file for pm2 to use.
 */

const isLocal = /^(@amzl|\.\/|\.\.)/;

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
	externals: [
		({ request: moduleName = '' }, callback) => {
			// "If the package is local, bundle it."
			if (isLocal.test(moduleName)) {
				console.log(`📦 ${moduleName} (bundled)`);
				return callback();
			}

			console.log(`👽 ${moduleName} (external)`);
			callback(undefined, `commonjs ${moduleName}`);
		}
	],
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
	},
	ignoreWarnings: [
		{
			// Because of await import()
			message: /the request of a dependency is an expression/
		}
	]
};

bundler(webpackBackendConfig).run(errorHandler);
