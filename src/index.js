/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const server = app.listen(app.get('port'));

process.on('unhandledRejection', (reason, p) =>
	logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
	logger.info(`Feathers application started on ${ app.get('host') }:${ app.get('port') }`)
);
