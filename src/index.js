
const path = require('path');
const fs = require('fs-extra');
const replace = require('./lib/replace');

module.exports = {
	init(args) {
		const {
			root,
			projectName,
			projectAuthor,
		} = args;

		fs.copySync(
			path.join(__dirname, 'templates', 'project'),
			root,
		);

		let packageJson = path.join(root, 'package.json');

		fs.readdirSync(root).forEach((filename) => {
			if (filename[0] === '_') {
				fs.renameSync(
					path.join(root, filename),
					path.join(root, filename.replace(/^_/, '.')),
				);
			}
		});

		replace.replaceTemplates(packageJson, packageJson, {
			PROJECT_NAME: projectName,
			AUTHOR_NAME: projectAuthor,
		});

		process.chdir(root);

		return Promise.resolve(root);
	},
	create(entityName) {
		const cwd = process.cwd();
		const clientBase = path.join(cwd, 'src', 'client');
		const templateBase = path.join(__dirname, 'templates', 'create');
		let src = path.join(templateBase, 'entity-template.js');
		let dst = path.join(clientBase, 'entity', `${entityName}.js`);
		replace.replaceTemplates(src, dst, {
			ENTITY_NAME: entityName,
		});
		src = path.resolve(templateBase, 'controller-template.js');
		dst = path.resolve(clientBase, 'controller', `${entityName}Controller.js`);
		replace.replaceTemplates(src, dst, {
			ENTITY_NAME: entityName,
		});
	},
};