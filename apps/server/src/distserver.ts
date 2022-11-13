import { CLIENT_BUILD_PATH } from '@amzl/constants/node';
import { server } from '@amzl/utils/node/rootenv';
import * as express from 'express';
import path from 'path';
import expressInit from './express';

const app = expressInit({
	corsOrigin: server.origin
});

app.use(express.static(CLIENT_BUILD_PATH));

app.get('*', (_, res) => {
	res.sendFile(path.resolve(CLIENT_BUILD_PATH, 'index.html'));
});

app.listen(server.port, () => {
	console.log(`Backend listening on port ${server.port}.`);
});
