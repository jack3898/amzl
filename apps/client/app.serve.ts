import { server } from '@amzl/config-webpack';
import { rootenv } from '@amzl/utils/node/rootenv';
import { webpackClientConfig } from './app.build';

rootenv();

server({ port: 3000 }, webpackClientConfig).start();
