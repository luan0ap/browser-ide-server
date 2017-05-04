import ssh from './ssh';
import cmd from './cmd/cmd';
import files from './files/files.service';

export default function() {
	const app = this;

	app.configure(ssh);
	app.configure(files);
	app.configure(cmd);
}
