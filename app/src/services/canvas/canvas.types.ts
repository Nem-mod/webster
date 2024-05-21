import { NodeConfig } from 'konva/lib/Node';
import { CanvasElementType } from './canvas-element-types.enum';
// import { Star, Text, Arc, Rect, Line, Image, Sprite, Arrow }

export interface ICanvasElement extends NodeConfig {
	type: CanvasElementType;
}
