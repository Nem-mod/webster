import Konva from 'konva';
import { useRef, useState } from 'react';
import { Arc, Arrow, Circle, Ellipse, Image, Layer, Line, Rect, Stage, Star, Text } from 'react-konva';
import { ICanvasData } from '../../redux/slices/canvasSlice/canvas-slice.types';
import { CanvasElementType } from '../../services/canvas/canvas-element-types.enum';

interface Props {
	canvas: ICanvasData;
	dimensions: {
		width: number;
		height: number;
	};
}

export const CanvasStage = ({ canvas, dimensions }: Props) => {
	const [shapes, setShapes] = useState(canvas.elements);
	const divRef = useRef<HTMLInputElement>(null);
	const [stageScale, setStageScale] = useState({
		scale: 1,
		stageX: 0,
		stageY: 0,
	});
	const [stageDrag, setStageDrag] = useState(false);

	// TODO: Find the right type
	const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
		// setStageDrag(false);
		e.evt.stopPropagination();
		const id = e.target.id();
		setShapes(
			shapes.map((shape) => {
				return {
					...shape,
					isDragging: shape.id === id,
				};
			})
		);
	};
	const handleDragEnd = (e) => {
		setShapes(
			shapes.map((shape) => {
				return {
					...shape,
					isDragging: false,
				};
			})
		);
	};

	const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
		e.evt.preventDefault();

		if (!e.target) return;

		if (e.evt.ctrlKey) {
			const scaleBy = 1.1;
			const stage = e.target.getStage();

			if (!stage) return;

			const oldScale = stage.scaleX();
			const mousePointTo = {
				x: stage.getPointerPosition()?.x / oldScale - stage.x() / oldScale,
				y: stage.getPointerPosition()?.y / oldScale - stage.y() / oldScale,
			};
			console.log('(stage.getPointerPosition()', stage.getPointerPosition());
			const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
			setStageScale(() => {
				return {
					scale: newScale,
					stageX: (stage.getPointerPosition().x / newScale - mousePointTo.x) * newScale,
					stageY: (stage.getPointerPosition().y / newScale - mousePointTo.y) * newScale,
				};
			});
			return;
		} else if (e.evt.shiftKey) {
			const scrollDist = 20;
			setStageScale({
				...stageScale,
				stageX: e.evt.deltaY > 0 ? stageScale.stageX - scrollDist : stageScale.stageX + scrollDist,
			});
			return;
		} else {
			const scrollDist = 20;
			setStageScale({
				...stageScale,
				stageY: e.evt.deltaY > 0 ? stageScale.stageY - scrollDist : stageScale.stageY + scrollDist,
			});
			return;
		}
	};

	const handleStageDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
		setStageDrag(true);
	};

	const handleStageDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
		setStageDrag(false);
	};

	const handleStageDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
		if (!stageDrag) return;

		const stage = e.target.getStage();

		setStageScale({
			...stageScale,
			stageX: stage?.x() + e.evt.movementX,
			stageY: stage?.y() + e.evt.movementY,
		});
	};

	return (
		<div ref={divRef}>
			<Stage
				onWheel={handleWheel}
				scaleX={stageScale.scale}
				scaleY={stageScale.scale}
				x={stageScale.stageX}
				y={stageScale.stageY}
				width={dimensions.width}
				height={dimensions.height}
				draggable
				onDragStart={handleStageDragStart}
				onDragMove={handleStageDragMove}
				onDragEnd={handleStageDragEnd}
			>
				<Layer>
					{/* TODO: REFACTOR */}
					{shapes?.map((shape, index) => {
						console.log('shape', shape);
						shape = { ...shape, onDragStart: handleDragStart, onDragEnd: handleDragEnd, draggable: true };
						// return (
						// 	<Star
						// 	key={shape.id}
						// 	id={shape.id}
						// 	x={shape.x}
						// 	y={shape.y}
						// 	numPoints={5}
						// 	innerRadius={20}
						// 	outerRadius={40}
						// 	fill='#89b717'
						// 	opacity={0.8}
						// 	draggable
						// 	rotation={shape.rotation}
						// 	shadowColor='black'
						// 	shadowBlur={10}
						// 	shadowOpacity={0.6}
						// 	shadowOffsetX={shape.isDragging ? 10 : 5}
						// 	shadowOffsetY={shape.isDragging ? 10 : 5}
						// 	scaleX={shape.isDragging ? 1.2 : 1}
						// 	scaleY={shape.isDragging ? 1.2 : 1}
						// 	onDragStart={handleDragStart}
						// 	onDragEnd={handleDragEnd}
						// />
						// )
						switch (shape.type) {
							case CanvasElementType.ARC:
								return <Arc {...{ ...shape, id: `${shape.type}-${index}` }} key={index} />;
							case CanvasElementType.ARROW:
								return <Arrow {...{ ...shape, id: `${shape.type}-${index}` }} key={index} />;
							case CanvasElementType.CIRCLE:
								return <Circle {...{ ...shape, id: `${shape.type}-${index}` }} key={index} />;
							case CanvasElementType.ELLIPSE:
								return <Ellipse {...{ ...shape, id: `${shape.type}-${index}` }} key={index} />;
							case CanvasElementType.IMAGE:
								return <Image {...{ ...shape, id: `${shape.type}-${index}` }} key={index} />;
							case CanvasElementType.LINE:
								return <Line {...{ ...shape, id: `${shape.type}-${index}` }} key={index} />;
							case CanvasElementType.RECT:
								return <Rect {...{ ...shape, id: `${shape.type}-${index}` }} key={index} />;
							case CanvasElementType.RING:
								return <Ring {...{ ...shape, id: `${shape.type}-${index}` }} key={index} />;
							case CanvasElementType.STAR:
								return <Star {...{ ...shape, id: `${shape.type}-${index}` }} key={index} />;
							case CanvasElementType.TEXT:
								return <Text {...{ ...shape, id: `${shape.type}-${index}` }} key={index} />;
						}
					})}
				</Layer>
			</Stage>
		</div>
	);
};
