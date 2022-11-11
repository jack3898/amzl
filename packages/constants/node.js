const path = require('path');

exports.ROOT = path.resolve(__dirname, '..', '..');
exports.ROOT_ENV_PATH = path.resolve(ROOT, '.env');
exports.NODE_MODULES_PATH = path.resolve(ROOT, 'node_modules');
