import assert from 'assert';
import test from '../../../../src/services/files/hooks/test';

describe('\'files\' service: \'test\' hook', () => {
	it('runs the hook', () => {
		const mock = {};
		const hook = test();

		return hook(mock).then(result => {
			assert.equal(result, mock, 'Returns the expected hook object');
		});
	});
});
