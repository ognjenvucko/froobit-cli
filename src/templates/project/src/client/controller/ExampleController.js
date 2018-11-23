import { withController, beforeRender } from 'froobit';
import { Example } from '../entity/Example';

const ExampleController = ({
	p5,
}) => {
	// pos = (0, 0)
	let pos = p5.createVector();
	const beforeRenderCtrl = beforeRender(() => {
		// get mouse vector
		const mouse = p5.createVector(p5.mouseX, p5.mouseY);
		// interpolate to mouse position
		pos = pos.lerp(mouse, 0.022);
		// translate before drawing entity
		p5.translate(pos);
	});
	// return entity Example with attached controller
	return withController(new Example(), beforeRenderCtrl);
};

export default ExampleController;