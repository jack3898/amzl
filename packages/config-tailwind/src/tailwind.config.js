const path = require('path');
const { ROOT } = require('@amzl/constants/node');

const locations = ['apps/client'];

module.exports = {
	content: locations.map((location) => path.resolve(ROOT, location, '**', '*.(tsx|html)')),
	theme: {
		extend: {
			screens: {
				'2xl': { max: '1535px' },
				xl: { max: '1279px' },
				lg: { max: '1023px' },
				md: { max: '767px' },
				sm: { max: '639px' }
			}
		}
	}
};
