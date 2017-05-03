import createService from './cmd.class.js';
import hooks from './cmd.hooks';
import filters from './cmd.filters';

export default function() {
	const app = this;

	app.use('/cmd', createService({
		name: 'cmd',
		paginate: app.get('paginate'),
	}));

	const service = app.service('cmd');

	service.hooks(hooks);
	service.filter(filters);
}
