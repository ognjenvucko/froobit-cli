#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const spawn = require('cross-spawn');
const inquirer = require('inquirer');
const chalk = require('chalk');
const cli = require('../src/');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

const { log } = console;

const shouldUseYarn = () => {
	try {
		execSync('yarn --version', { stdio: 'ignore' });
		return true;
	} catch (e) {
		return false;
	}
};

const getPkgManager = () => {
	if (shouldUseYarn()) {
		return 'yarn';
	}
	return 'npm';
};

const commands = argv._;

if (commands.length === 0) {
	log(chalk.red.bold('No command specified.'));
	log(chalk.white.bold('Did you want to run ') + chalk.blue.bold('froo init <project-name>?'));
	process.exit(1);
}

const [cmdAction, cmdParam] = commands;

switch (cmdAction) {
	case 'init':
		if (!cmdParam) {
			log(chalk.white.bold('Usage: ') + chalk.blue.bold('froo init <project-name>'));
			process.exit(1);
		} else {
			// eslint-disable-next-line
			init(cmdParam);
		}
		break;
	case 'create':
		if (!cmdParam) {
			log(chalk.white.bold('Usage: ') + chalk.blue.bold('froo create <entity-name>'));
			process.exit(1);
		} else {
			cli.create(cmdParam);
		}
		break;
	default:
		console.error(
			'Unknown command: `%s`',
			cmdAction,
		);
		process.exit(1);
		break;
}

function checkIfDirExists(name) {
	const props = {
		type: 'confirm',
		name: 'continueDirExists',
		message: `Directory ${name} already exists. Do still you want to continue?`,
		default: false,
	};

	// eslint-disable-next-line
	return inquirer.prompt(props).then((answers) => {
		if (answers && answers.continueDirExists) {
			return true;
		}
		log('Froobit project not initialized.');
		process.exit(1);
	});
}

function promptProjectInfo(name) {
	let questions = [
		{
			type: 'input',
			name: 'projectName',
			message: 'What\'s your project name?',
			default: name,
		},
		{
			type: 'input',
			name: 'projectAuthor',
			message: 'What\'s author\'s name?',
			default: 'froobit',
		},
		{
			type: 'confirm',
			name: 'autoInstall',
			message: 'Install dependencies automatically?',
			default: 'y',
		},
	];
	return inquirer.prompt(questions);
}

function install(directory) {
	log(chalk.white.bold('Installing project dependencies:'));
	const pkgManager = getPkgManager();
	const args = ['install'];

	return new Promise(((resolve) => {
		const proc = spawn(pkgManager, args, { stdio: 'inherit', cwd: directory });

		proc.on('close', (code) => {
			if (code !== 0) {
				console.error(`\`${pkgManager} install\` failed.`);
				resolve(false);
			} else {
				resolve(true);
			}
		});
	}));
}

function createProject(name, {
	projectName,
	projectAuthor,
	autoInstall,
}) {
	const pkgManager = getPkgManager();
	const root = path.resolve(name);

	log(
		'Creating a new Froobit project in',
		root,
	);

	if (!fs.existsSync(root)) {
		fs.mkdirSync(root);
	}
	process.chdir(root);

	cli.init({
		root,
		dirName: name,
		projectName,
		projectAuthor,
	}).then((directory) => {
		if (autoInstall) {
			return install(directory);
		}
		return false;
	}).then((isAutoInstalled) => {
		log(chalk.green.bold('Project created!'));
		log(chalk.white.bold('To start your app:'));
		log(chalk.white(`   cd ${name}`));
		if (!isAutoInstalled) {
			log(chalk.white(`   ${pkgManager === 'npm' ? 'npm install' : 'yarn'}`));
		}
		log(chalk.white(`   ${pkgManager} run dev`));
	});
}

function init(name) {
	Promise.resolve(fs.existsSync(name))
		// eslint-disable-next-line
		.then((dirExists) => {
			if (dirExists) {
				return checkIfDirExists(name);
			}
		})
		.then(() => {
			return promptProjectInfo(name);
		})
		.then((answers) => {
			return createProject(name, answers);
		})
		.catch((err) => {
			console.error('Error occured', err.stack);
			process.exit(1);
		});
}