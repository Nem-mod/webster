import { Arc, Arrow, Circle, Ellipse, Text, Line, Rect, Ring, Star } from 'react-konva';
import { CanvasElementType } from '../../../services/canvas/canvas-element-types.enum';
import ImageElement from '../../CanvasStage/ImageElement';
import { ICanvasElement } from '../../../services/canvas/canvas.types';

interface IProps {
	shape: ICanvasElement;
	index: number;
}

// const transformerStyles = {
// 	anchorStroke: 'blue',
// 	anchorFill: 'white',
// 	anchorSize: 8,
// 	borderStroke: 'blue',
// 	borderDash: [3, 3],
// };

export default function HistoryCanvasElement({ shape, index }: IProps) {
	
	const shapeDecorator = {
		...shape,
		id: `${shape.type}-${index}`,
		name: 'canvas-element',
	};

	return (
		<>
			{(() => {
				switch (shape.type) {
					case CanvasElementType.ARC:
						return <Arc {...shapeDecorator} />;
					case CanvasElementType.ARROW:
						return <Arrow {...shapeDecorator} />;
					case CanvasElementType.CIRCLE:
						return <Circle {...shapeDecorator} />;
					case CanvasElementType.ELLIPSE:
						return <Ellipse {...shapeDecorator} />;
					case CanvasElementType.IMAGE:
						return <ImageElement shape={shapeDecorator} />;
					// TODO: create settings of drawing. color - strW - tension
					case CanvasElementType.LINE:
						return (
							<Line
								{...shapeDecorator}
								stroke='#df4b26'
								strokeWidth={5}
								tension={0.5}
								lineCap='round'
								lineJoin='round'
								globalCompositeOperation={shape.tool === 'eraser' ? 'destination-out' : 'source-over'}
							/>
						);
					case CanvasElementType.RECT:
						return <Rect {...shapeDecorator} />;
					case CanvasElementType.RING:
						return <Ring {...shapeDecorator} />;
					case CanvasElementType.STAR:
						return <Star {...shapeDecorator} />;
					case CanvasElementType.TEXT:
						return <Text {...shapeDecorator}/>;
				}
			})()}
		</>
	);
}
