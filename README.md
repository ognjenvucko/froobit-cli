
# Froobit-CLI

  

Official **Froobit** CLI tool for project quick setup & project files creation.

  
### Instalation

```
npm install -g froobit-cli
```
### Project Quick Setup
Init command will create a new Froobit project. It will generate all the necessary boilerplate code so that you can start working on a new Froobit project right away.
```
froo init <project-name>
```

### Create command

```
froo create <entity-name>
```

#### Example

Command:

```
froo create SpaceShip
```

Will create two files, Controller and Entity files with boilerplate code.

```bash
├── src/client
	├── controller
	│ 	└── SpaceShipController.js
	└── entity
		└── SpaceShip.js
```

## License

 
This work is available under [MIT license](./LICENSE)