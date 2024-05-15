import { CanvasElementType } from './canvas-element-types.enum';
import { ICanvasElement } from './canvas.types';

abstract class CanvasElementFactory {
	static register(type: CanvasElementType, creator: () => ICanvasElement) {
		this.creators[type] = creator;
	}

	static createElement(type: CanvasElementType): (...args: unknown[]) => ICanvasElement {
		const creator = this.creators[type];
		if (!creator) {
			throw new Error(`Unknown element type: ${type}`);
		}
		return creator;
	}

	private static creators: { [type in CanvasElementType]?: () => ICanvasElement } = {};
}

CanvasElementFactory.register(CanvasElementType.IMAGE, () => ({ type: CanvasElementType.IMAGE }));
CanvasElementFactory.register(CanvasElementType.TEXT, () => ({ type: CanvasElementType.TEXT }));
CanvasElementFactory.register(CanvasElementType.CIRCLE, () => ({ type: CanvasElementType.CIRCLE }));
CanvasElementFactory.register(CanvasElementType.RECT, () => ({ type: CanvasElementType.RECT }));
CanvasElementFactory.register(CanvasElementType.ELLIPSE, () => ({ type: CanvasElementType.ELLIPSE }));
CanvasElementFactory.register(CanvasElementType.STAR, () => ({ type: CanvasElementType.STAR }));
CanvasElementFactory.register(CanvasElementType.RING, () => ({ type: CanvasElementType.RING }));
CanvasElementFactory.register(CanvasElementType.LINE, () => ({ type: CanvasElementType.LINE }));
CanvasElementFactory.register(CanvasElementType.ARROW, () => ({ type: CanvasElementType.ARROW }));
CanvasElementFactory.register(CanvasElementType.ARC, () => ({ type: CanvasElementType.ARC }));

export default CanvasElementFactory;
