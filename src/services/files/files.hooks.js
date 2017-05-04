export default {
	before: {
		all: [
			(hook) => {
				hook.params.ssh = hook.app.ssh;
			},
		],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},

	after: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},

	error: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},
};
