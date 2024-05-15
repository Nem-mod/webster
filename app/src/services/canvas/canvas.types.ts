import { NodeConfig } from 'konva/lib/Node';
import { CanvasElementType } from './canvas-element-types.enum';

export interface ICanvasElement extends Partial<NodeConfig> {
	type: CanvasElementType;
}
