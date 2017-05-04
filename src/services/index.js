import files from './files/files.service';
import cmd from './cmd/cmd';

export default function() {
	const app = this;

	app.configure(files);
	app.configure(cmd);
}
