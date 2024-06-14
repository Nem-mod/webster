import { ICanvasData } from '../redux/slices/canvasSlice/canvas-slice.types';
import { CanvasElementType } from '../services/canvas/canvas-element-types.enum';
// https://storage.googleapis.com/webster_images/54dc2db2-8a52-4b4b-ba9d-b0ad4dc40f1c.photo_2024-04-21_23-03-41.jpg
export const CANVASES: ICanvasData[] = [
	{
		id: 1,
		title: 'title',
		elements: [
			{
				type: CanvasElementType.RECT,
				x: 200,
				y: 200,
				width: 100,
				height: 200,
				fill: 'blue',
			},
			{
				type: CanvasElementType.RECT,
				x: 100,
				y: 100,
				width: 100,
				height: 200,
				fill: 'green',
			},
			{
				type: CanvasElementType.IMAGE,
				x: 300,
				y: 300,
				width: 100,
				height: 100,
				src: 'https://storage.googleapis.com/webster_images/54dc2db2-8a52-4b4b-ba9d-b0ad4dc40f1c.photo_2024-04-21_23-03-41.jpg',
			},
		],
		selected: [],
	},
];
