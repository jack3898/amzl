const path = require('path');
const { ROOT } = require('@amzl/constants/node');

const locations = ['apps/client', 'packages/react-components'];

module.exports = {
	content: locations.map((location) => path.resolve(ROOT, location, '**', '*.(tsx|html)'))
};
