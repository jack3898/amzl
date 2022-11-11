const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');

exports.ROOT = ROOT;
exports.ROOT_ENV_PATH = path.resolve(ROOT, '.env');
exports.NODE_MODULES_PATH = path.resolve(ROOT, 'node_modules');
