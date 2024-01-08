import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import { trpcRouter } from '../trpcRouter';
import { createContext } from './trpcInit';

export default function expressInit({ corsOrigin }: { corsOrigin: string }) {
	const app = express();

	app.get('/accident', (_, res) => {
		res.redirect(process.env.ACCIDENT_REDIRECT_URL || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
	});

	app.use(cors({ origin: corsOrigin, credentials: true }));
	app.use('/trpc', trpcExpress.createExpressMiddleware({ router: trpcRouter, createContext }));

	return app;
}
