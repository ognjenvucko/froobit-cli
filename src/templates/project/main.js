import Framework from 'froobit';
import logo from './assets/logo.png';
import ExampleController from './src/client/controller/ExampleController';

// Entry point file

// Register assets
const assets = {
	images: {
		logo,
	},
};

// Register controllers
const controllers = [
	ExampleController,
];

const game = Framework.with(controllers, { assets });

// Init game
game.init();