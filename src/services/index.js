const files = require('./files/files.service');
const cmd = require('./cmd/cmd.service.js');

module.exports = function() {
	const app = this;

	app.configure(files);
	app.configure(cmd);
};
