import { client } from '@amzl/utils/node/rootenv';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import { createContext } from './trpcInit';
import { trpcRouter } from './trpcRouter';

export default function server() {
	const app = express();

	app.use(cors({ origin: client.origin, credentials: true }));
	app.use('/trpc', trpcExpress.createExpressMiddleware({ router: trpcRouter, createContext }));

	return app;
}
