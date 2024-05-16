import { ICanvasElement } from '../../../services/canvas/canvas.types';

export interface ICanvasData {
	id: number;
	title: string;
	// stageSettings: {};
	elements: ICanvasElement[];
}

export interface IUpdateElement {
	index: number;
	element: Partial<ICanvasElement>;
}
