![Froobit - JS Game Framework](https://i.imgur.com/pofCLdM.png)
**JavaScript Game Development Framework**

Froobit is a JavaScript Game development framework based on P5js renderer, offering developers powerful yet easy to use API for developing 2D games.
### Features
- Asset loading (images, sounds, fonts)
- Sprite animations
- PlanckJS (box2d) based Physics support
- Built-in Level Editor
- Canvas Layering
- Conditional Rendering
- Parallax background & Background repetition
- Webpack bundler & ES6 language features supported
- Multiplayer support
- CLI tool (**froo** tool) speed up development
## Getting started
### Quick project setup
#### Install Froobit-CLI

```
npm install -g froobit-cli
```
#### Create new Froobit project
```
froo init my-game
```

#### Run you project (dev mode)

This command starts webpack dev server on port ***:4000**, and opens your project in default browser.
```
npm run dev
```
Webpack dev server will listen on port ***:4000**
### Hello World Example
#### Steps

 1. Create **Entity** class, define render method
 2. Define Simple **Controller** function which returns new instance of your Entity
 3. Register Controller within **Framework**

**/entity/Hello.js**
```js
import Framework from 'froobit';

export  class  Hello  extends  Framework.Entity {
	render(p) {
		p.text('Hello from Froobit!', 0, 0);
	}
}
```
**/controller/HelloController.js**
```js
import { Hello } from  '../entity/Hello';

const  HelloController  = () => {
	return new Hello();
};

export default HelloController;
```
**/main.js** - Entry point
```js
import Framework from 'froobit';
import HelloController from './controller/HelloController';

// register controller(s)
const game = Framework.with([
	HelloController,
]);

// now start the game!
game.init();
```
## CLI tool
You can also use Froobit **CLI** tool to quickly generate project files, like Entities and Controllers.
#### Usage
```
froo create Character
```
This command will create **/entity/Character.js** and **/controller/CharacterController.js** with boilerplate code.
## License
Froobit is available under [MIT license.](./LICENSE)