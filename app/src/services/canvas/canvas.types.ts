import Konva from 'konva';
import { NodeConfig } from 'konva/lib/Node';
import { CanvasElementType } from './canvas-element-types.enum';
// import { Star, Text, Arc, Rect, Line, Image, Sprite, Arrow }

export interface ICanvasElement
	//Partial<Konva.SpriteConfig>, Partial<Konva.ArrowConfig>,
	extends Partial<NodeConfig>,
		Partial<Konva.StarConfig>,
		Partial<Konva.TextConfig>,
		Partial<Konva.ArcConfig>,
		Partial<Konva.RectConfig>,
		Partial<Konva.LineConfig>,
		Partial<Konva.ImageConfig>,
		Partial<Konva.CircleConfig> {
	type: CanvasElementType;
}
