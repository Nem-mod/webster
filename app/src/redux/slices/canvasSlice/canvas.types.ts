import { NodeConfig } from 'konva/lib/Node';

export enum CanvasElementType {
	// Core
	IMAGE = 'image',
	TEXT = 'text',

	// Shapes
	CIRCLE = 'circle',
	RECT = 'rect',
	ELLIPSE = 'ellipse',
	STAR = 'star',
	RING = 'ring',

	// Lines
	LINE = 'line',
	ARROW = 'arrow',
	ARC = 'arc',
}

interface ICanvasElement extends NodeConfig {
	type: CanvasElementType;
}

export interface ICanvasData {
	id: number;
	title: string;
	// stageSettings: {};
	elements: ICanvasElement[];
}
