import { server } from '@amzl/utils/node/rootenv';
import expressServer from './express';

expressServer().listen(server.port, () => {
	console.log(`Backend listening on port ${server.port}`);
});
