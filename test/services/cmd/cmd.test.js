import assert from 'assert';
import app from '../../../src/app';

describe('\'cmd\' service', () => {
	it('registered the service', () => {
		const service = app.service('cmd');

		assert.ok(service, 'Registered the service');
	});
});
