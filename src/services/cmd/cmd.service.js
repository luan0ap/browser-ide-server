const createService = require('./cmd.class.js');
const hooks = require('./cmd.hooks');
const filters = require('./cmd.filters');

module.exports = function() {
	const app = this;

	app.use('/cmd', createService({
		name: 'cmd',
		paginate: app.get('paginate'),
	}));

	const service = app.service('cmd');

	service.hooks(hooks);
	service.filter(filters);
};
