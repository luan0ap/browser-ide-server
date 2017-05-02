const files = require('./files/files.service');

module.exports = function() {
	const app = this;

	app.configure(files);
};
