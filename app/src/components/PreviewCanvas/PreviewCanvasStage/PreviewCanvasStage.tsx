import { Layer, Stage } from "react-konva";
import { ICanvas } from "../../../redux/slices/canvases/canvases-slice.types";
import { ICanvasElement } from "../../../services/canvas/canvas.types";
import PreviewCanvasElement from "../PreviewCanvasElement/PreviewCanvasElement";
import { ICanvasData } from "../../../redux/slices/canvasSlice/canvas-slice.types";
interface IProps {
	canvas: ICanvas | ICanvasData,
	scaleParam: number,
	shapes: ICanvasElement[]
}

export default function PreviewCanvasStage({canvas, scaleParam, shapes}: IProps) {
	
	return (
		<Stage
		width={canvas.resolution[0] / scaleParam}
		height={canvas.resolution[1] / scaleParam}
		x={0}
		y={0}
		scaleX={1 / scaleParam}
		scaleY={1 / scaleParam}
		// className={'object-contain'}
	>
		<Layer>
			{shapes && shapes?.map((shape: ICanvasElement, index: number) => {
				shape = {
					...shape,
					id: `${shape.type}-${index}`,
				};

				return (
					<PreviewCanvasElement
						key={index}
						shape={shape}
						index={index}
					/>
				);
			})}
		</Layer>
	</Stage>
	)
}
