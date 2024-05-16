import Konva from 'konva';
import { useEffect, useRef } from 'react';
import { Arc, Arrow, Circle, Ellipse, Image, Line, Rect, Ring, Star, Text, Transformer } from 'react-konva';
import { CanvasElementType } from '../../services/canvas/canvas-element-types.enum';
import { ICanvasElement } from '../../services/canvas/canvas.types';
// import { ICanvasData } from '../../redux/slices/canvasSlice/canvas-slice.types';
interface IProps {
	shape: ICanvasElement;
	index: number;
	isSelected: boolean;
	onSelect: () => void;
	onChange: (index: number, element: Partial<ICanvasElement>) => void;
}

export default function CanvasElement({ shape, index, isSelected, onSelect, onChange }: IProps) {
	const shapeRef = useRef<any>(null);
	const trRef = useRef<any>(null);

	useEffect(() => {
		if (isSelected && trRef.current) {
			trRef.current.nodes([shapeRef.current]);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

	const handleTransform = () => {
		const node = shapeRef.current;
		if (!node) return;
		console.log('node', node);
		const scaleX = node.scaleX();
		const scaleY = node.scaleY();

		// we will reset it back
		node.scaleX(1);
		node.scaleY(1);

		onChange(index, {
			x: node.x(),
			y: node.y(),
			// set minimal value
			width: Math.max(5, node.width() * scaleX),
			height: Math.max(node.height() * scaleY),
		});
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
		onClick: onSelect,
		onTap: onSelect,
		onTransform: handleTransform,
		onDragMove: handleDrag,
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
						return <Image {...shapeDecorator} />;
					case CanvasElementType.LINE:
						return <Line {...shapeDecorator} />;
					case CanvasElementType.RECT:
						return <Rect {...shapeDecorator} />;
					case CanvasElementType.RING:
						return <Ring {...shapeDecorator} />;
					case CanvasElementType.STAR:
						return <Star {...shapeDecorator} />;
					case CanvasElementType.TEXT:
						return <Text {...shapeDecorator} />;
				}
			})()}
			{isSelected && (
				<Transformer
					ref={trRef}
					flipEnabled={false}
					boundBoxFunc={(oldBox, newBox) => {
						// limit resize
						if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
							return oldBox;
						}
						return newBox;
					}}
				/>
			)}
		</>
	);
}
