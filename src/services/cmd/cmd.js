export default function() {
	const app = this;

	app.post('/cmd', (req, res) => {
		res.end('hello');
	});
}
