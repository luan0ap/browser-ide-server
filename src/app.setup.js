import path from 'path';

import cors from 'cors';
import helmet from 'helmet';
import compress from 'compression';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';

export default function() {
	const app = this;

	app.use(cors());
	app.use(helmet());
	app.use(compress());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
}
