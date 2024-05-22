import { ICanvasElement } from '../../../services/canvas/canvas.types';

export interface ICanvasData {
	id: number;
	title: string;
	// stageSettings: {};
	elements: ICanvasElement[];
	selected: ICanvasSelectedElement[];
	history?: {
		stack: ICanvasElement[][];
		size: number;
		currentPos: number;
	} | null;
}

export interface IUpdateElement {
	index: number;
	element: Partial<ICanvasElement>;
}

export interface ISelectedElements {
	elementIndexes: number[];
}

export interface ICanvasSelectedElement extends ICanvasElement {
	index: number;
}
