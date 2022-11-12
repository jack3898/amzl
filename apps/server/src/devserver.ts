import { devClient, server } from '@amzl/utils/node/rootenv';
import expressInit from './express';

const app = expressInit({
	corsOrigin: devClient.origin
});

app.listen(server.port, () => {
	console.log(
		`Backend listening on port ${server.port}. IN DEVELOPMENT so serving api resources only.`
	);
});
