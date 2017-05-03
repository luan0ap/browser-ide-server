import assert from 'assert';
import request from 'request-promise';
import app from '../src/app';

const port = app.get('port');

describe('Feathers application tests', () => {
	before(function(done) {
		this.server = app.listen(port);
		this.server.once('listening', () => done());
	});

	after(function(done) {
		this.server.close(done);
	});

	it('starts and shows the index page', () => {
		return request(`http://localhost:${ port }`).then(body =>
			assert.ok(body.indexOf('<html>') !== -1)
		);
	});

	describe('404', () => {
		it('shows a 404 HTML page', () => {
			return request({
				url: `http://localhost:${ port }/path/to/nowhere`,
				headers: {
					'Accept': 'text/html',
				},
			}).catch(res => {
				assert.equal(res.statusCode, 404);
				assert.ok(res.error.indexOf('<html>') !== -1);
			});
		});

		it('shows a 404 JSON error without stack trace', () => {
			return request({
				url: `http://localhost:${ port }/path/to/nowhere`,
				json: true,
			}).catch(res => {
				assert.equal(res.statusCode, 404);
				assert.equal(res.error.code, 404);
				assert.equal(res.error.message, 'Page not found');
				assert.equal(res.error.name, 'NotFound');
			});
		});
	});
});
