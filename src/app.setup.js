const path = require('path');

const cors = require('cors');
const helmet = require('helmet');
const compress = require('compression');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

module.exports = function() {
	const app = this;

	app.use(cors());
	app.use(helmet());
	app.use(compress());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
};
