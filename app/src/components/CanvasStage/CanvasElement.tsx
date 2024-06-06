import Konva from 'konva';
import { useRef } from 'react';
import { Arc, Arrow, Circle, Ellipse, Image, Line, Rect, Ring, Star } from 'react-konva';
import { CanvasElementType } from '../../services/canvas/canvas-element-types.enum';
import { ICanvasElement } from '../../services/canvas/canvas.types';
import EditableText from './EditableText';
import ImageElement from './ImageElement';

interface IProps {
	shape: ICanvasElement;
	index: number;
	isSelected?: boolean;
	onSelect?: () => void;
	onChange?: (index: number, element: Partial<ICanvasElement>) => void;
	getKey: number;
}

// const transformerStyles = {
// 	anchorStroke: 'blue',
// 	anchorFill: 'white',
// 	anchorSize: 8,
// 	borderStroke: 'blue',
// 	borderDash: [3, 3],
// };

export default function CanvasElement({ shape, index, onChange }: IProps) {
	const shapeRef = useRef<any>(null);

	const handleTransform = () => {
		const node: Konva.Node = shapeRef.current;
		if (!node) return;
		const scaleX = node.scaleX();
		const scaleY = node.scaleY();

		node.scaleX(1);
		node.scaleY(1);

		if(shape.type === CanvasElementType.LINE) {
			const nodeAsLine: Konva.Line = node as Konva.Line;
			const oldPoints: number[] = nodeAsLine.points();
			const newPoints = oldPoints.map((point, index) => {
				return index % 2 ? point * scaleY : point * scaleX
			})
			nodeAsLine.points(newPoints);
		}
		const element = {
			...node.attrs,
			...shape,
			x: node.x(),
			y: node.y(),
			radius: node.attrs.radius,

			width: Math.max(5, node.width() * scaleX),
			height: Math.max(node.height() * scaleY),
		};

		onChange(index, element);
		node.width(Math.max(5, node.width() * scaleX));
	};

	const handleDrag = (e: Konva.KonvaEventObject<DragEvent>) => {
		onChange(index, {
			x: e.target.x(),
			y: e.target.y(),
		});
	};

	const shapeDecorator = {
		...shape,
		ref: shapeRef,
		id: `${shape.type}-${index}`,
		name: 'canvas-element',
		onTransformEnd: handleTransform,
		onDragEnd: handleDrag,
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
						return <ImageElement index={index} shape={shapeDecorator} />;
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
						return <EditableText index={index} onChange={onChange} shape={shapeDecorator} />;
				}
			})()}
		</>
	);
}
