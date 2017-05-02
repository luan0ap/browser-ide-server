module.exports = function(options = {}) {
	return function(hook) {
		return Promise.resolve(hook);
	};
};
