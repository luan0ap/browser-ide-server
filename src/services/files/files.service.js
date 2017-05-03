import createService from 'feathers-memory';
import hooks from './files.hooks';
import filters from './files.filters';

export default function() {
	const app = this;

	app.use('/files', createService({
		name: 'files',
		paginate: app.get('paginate'),
	}));

	const service = app.service('files');

	service.hooks(hooks);
	service.filter(filters);
}
