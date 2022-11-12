import { server } from '@amzl/config-webpack';
import { devClient } from '@amzl/utils/node/rootenv';
import { webpackClientConfig } from './app.build';

server({ port: devClient.port }, webpackClientConfig).start();
