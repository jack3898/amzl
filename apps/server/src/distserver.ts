import { DIST_PATH } from '@amzl/constants/node';
import { server } from '@amzl/utils/node/rootenv';
import express from 'express';
import path from 'path';
import expressInit from './express';

const app = expressInit({
	corsOrigin: server.origin
});

app.use(express.static(path.resolve(DIST_PATH, 'client')));

app.get('*', (_, res) => {
	res.sendFile(path.resolve(DIST_PATH, 'client', 'index.html'));
});

app.listen(server.port, () => {
	console.log(`Backend listening on port ${server.port}.`);
});
