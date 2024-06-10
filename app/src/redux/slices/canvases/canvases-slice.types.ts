export interface ICanvas {
	_id: string,
	canvasName: string;
	resolution: [number, number];
	canvas: {
		elements: []
	};
}

export interface ICanvasesData {
	canvases: ICanvas[];
}

export interface ICreateCanvas {
	canvasName: string;
	resolution: [number, number];
	canvas: {
		elements: []
	};
}


export interface IUpdateCanvas {
	_id: string
	canvasName?: string;
	resolution?: [number, number];
}