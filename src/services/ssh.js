import SSH from 'node-ssh';
import logger from 'winston';

const client = new SSH();

export default function() {
	const app = this;

	const config = app.get('ssh');
	config.host = config.host;
	config.username = config.username;
	config.privateKey = config.privateKey;

	client.connect(config).then(() =>
		logger.info('SSH client started')
	);

	app.use((req, res, next) => {
		req.ssh = client;
		return next();
	});
}
