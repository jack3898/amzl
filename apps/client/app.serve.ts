import { server } from '@amzl/config-webpack';
import { client } from '@amzl/utils/node/rootenv';
import { webpackClientConfig } from './app.build';

server({ port: client.port }, webpackClientConfig).start();
