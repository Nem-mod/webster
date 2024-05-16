import { ICanvasData } from '../redux/slices/canvasSlice/canvas-slice.types';
import { CanvasElementType } from '../services/canvas/canvas-element-types.enum';

export const CANVASES: ICanvasData[] = [
	{
		id: 1,
		title: 'title',
		elements: [
			{
				type: CanvasElementType.RECT,
				x: -100,
				y: -100,
				width: 100,
				height: 200,
				fill: 'blue',
			},
			{
				type: CanvasElementType.CIRCLE,
				x: 200,
				y: 200,
				fill: 'red',
				radius: 150,
			},
		],
	},
];
