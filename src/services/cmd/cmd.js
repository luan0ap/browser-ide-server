export default function() {
	const app = this;

	app.post('/cmd', (req, res) => {
		if (!req.body.cmd) {
			res.end('You must specify a `cmd`.');
			return;
		}

		req.ssh.connection.exec(req.body.cmd, { cwd: '/var/www' }, (err, stream) => {
			if (err) {
				res.end(err);
				return;
			}

			stream
				.on('close', (code, signal) => res.end())
				.on('data', (data) => res.write(data.toString()))
				.stderr.on('data', (data) => res.write(data.toString()))
			;
		});
	});
}
