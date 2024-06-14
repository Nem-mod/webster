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
	search?: ICanvas[] | null;
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