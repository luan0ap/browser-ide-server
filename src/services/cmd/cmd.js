export default function() {
	const app = this;

	app.post('/cmd', (req, res) => {
		let { cmd, cwd } = req.body;

		if (!cmd) {
			res.end('You must specify a `cmd`.');
			return;
		}

		req.ssh.execCommand(cmd, { cwd }).then((response) => {
			return res.end(response.stdout || response.stderr);
		});
	});
}
