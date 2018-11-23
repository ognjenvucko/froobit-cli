import Framework from 'froobit';

export class Example extends Framework.Entity {
	render(p, { logo }) {
		p.background(8, 34, 61, 50);
		p.imageMode(p.CENTER);
		p.image(logo, 0, 0);
	}
}