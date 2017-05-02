const assert = require('assert');
const app = require('../../../src/app');

describe('\'cmd\' service', () => {
	it('registered the service', () => {
		const service = app.service('cmd');

		assert.ok(service, 'Registered the service');
	});
});
