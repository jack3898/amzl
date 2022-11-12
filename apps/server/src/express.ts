import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import { trpcRouter } from '../trpcRouter';
import { createContext } from './trpcInit';

export default function expressInit({ corsOrigin }: { corsOrigin: string }) {
	const app = express();

	app.use(cors({ origin: corsOrigin, credentials: true }));
	app.use('/trpc', trpcExpress.createExpressMiddleware({ router: trpcRouter, createContext }));

	return app;
}
