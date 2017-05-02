const createService = require('feathers-memory');
const hooks = require('./files.hooks');
const filters = require('./files.filters');

module.exports = function() {
	const app = this;

	app.use('/files', createService({
		name: 'files',
		paginate: app.get('paginate'),
	}));

	const service = app.service('files');

	service.hooks(hooks);
	service.filter(filters);
};
