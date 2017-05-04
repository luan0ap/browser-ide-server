import path from 'path';
import fs from 'fs';
import os from 'os';
import crypto from 'crypto';

export class Service {
	getLocal(id) {
		let local = path.join(
			os.tmpdir(),
			'browser-ide',
		);

		if (fs.existsSync(local) === false) {
			fs.mkdirSync(local);
		}

		return path.join(
			local,
			crypto.createHash('md5').update(id).digest('hex')
		);
	}

	encodeId(id) {
		return id.replace(/[/\/]/g, '!');
	}

	decodeId(id) {
		return id.replace(/!/g, path.sep);
	}

	constructor(options = {}) {
		this.options = options;
	}

	find(params) {
		let cwd = params.query.path || '/home/ec2-user';
		return params.ssh.execCommand('ls -1a', { cwd }).then((result) => {
			return result.stdout
				.split('\n')
				.map(filename => filename.trim())
				.filter(filename => filename && ![ '.', '..' ].includes(filename))
				.map(filename => ({
					id: this.encodeId(path.join(cwd, filename)),
					filename,
				}))
			;
		});
	}

	get(id, params) {
		let local = this.getLocal(id);
		let filename = this.decodeId(id);

		return params.ssh.getFile(local, filename).then((result) => {
			return new Promise((resolve, reject) => {
				return fs.readFile(local, 'utf8', (err, body) => {
					if (err) {
						return reject(err);
					}

					return resolve({
						id,
						body,
					});
				});
			});
		});
	}

	create(data, params) {
		let { filename, body } = data;
		let id = this.encodeId(filename);
		let local = this.getLocal(id);

		return new Promise((resolve, reject) => {
			return fs.writeFile(local, body, (err) => {
				if (err) {
					return reject(err);
				}

				return params.ssh.putFile(local, filename).then((result) => {
					return resolve({
						id,
						body,
					});
				});
			});
		});
	}

	update(id, data, params) {
		let { body } = data;
		let local = this.getLocal(id);
		let filename = this.decodeId(id);

		return new Promise((resolve, reject) => {
			return fs.writeFile(local, body, (err, body) => {
				if (err) {
					return reject(err);
				}

				return params.ssh.putFile(local, filename).then((result) => {
					return resolve({
						id,
						body,
					});
				});
			});
		});
	}

	remove(id, params) {
		let local = this.getLocal(id);
		let filename = this.decodeId(id);

		return new Promise((resolve, reject) => {
			return fs.unlink(local, (err) => {
				if (err) {
					return reject(err);
				}

				return params.ssh.execCommand(`rm ${ filename }`).then((result) => {
					return resolve({
						id,
					});
				});
			});
		});
	}
}

export default function(options) {
	return new Service(options);
}
