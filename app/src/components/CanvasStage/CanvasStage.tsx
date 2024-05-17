import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import { useAppDispatch } from '../../hooks/redux';
import { ICanvasState, updateElement } from '../../redux/slices/canvasSlice/canvas-slice';
import { ICanvasElement } from '../../services/canvas/canvas.types';
import CanvasElement from './CanvasElement';

interface Props {
	canvasState: ICanvasState;
	dimensions: {
		width: number;
		height: number;
	};
}

/**
 * 	const handleStageDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
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

 */

export const CanvasStage = ({ canvasState, dimensions }: Props) => {
	const canvas = canvasState.data;
	const dispatch = useAppDispatch();
	const [shapes, setShapes] = useState(canvas?.elements);
	const [selectedId, selectShape] = useState<string | null>(null);

	const checkDeselect = (e) => {
		// deselect when clicked on empty area
		const clickedOnEmpty = e.target === e.target.getStage();
		if (clickedOnEmpty) {
			selectShape(null);
		}
	};

	useEffect(() => {
		setShapes(canvas?.elements);
	}, [canvas]);

	const divRef = useRef<HTMLInputElement>(null);
	const [stageScale, setStageScale] = useState({
		scale: 1,
		stageX: 0,
		stageY: 0,
	});

	const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
		// setStageDrag(false);
		if (!shapes) return;
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

	const handleDragEnd = () => {
		if (!shapes) return;
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
			const stage: Konva.Stage | null = e.target.getStage();

			if (!stage) return;

			const pointerPosition = stage.getPointerPosition();

			if (!pointerPosition) return;

			const oldScale = stage.scaleX();
			const mousePointTo = {
				x: pointerPosition?.x / oldScale - stage.x() / oldScale,
				y: pointerPosition?.y / oldScale - stage.y() / oldScale,
			};

			const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
			setStageScale(() => {
				return {
					scale: newScale,
					stageX: (pointerPosition.x / newScale - mousePointTo.x) * newScale,
					stageY: (pointerPosition.y / newScale - mousePointTo.y) * newScale,
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

	const handleChangeElement = (index: number, element: Partial<ICanvasElement>) => {
		dispatch(
			updateElement({
				index,
				element,
			})
		);
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
				// draggable
				// onDragStart={handleStageDragStart}
				// onDragMove={handleStageDragMove}
				// onDragEnd={handleStageDragEnd}
				onMouseDown={checkDeselect}
				onTouchStart={checkDeselect}
			>
				<Layer>
					{/* <Arc/> */}
					{/* TODO: REFACTOR */}
					{shapes?.map((shape, index) => {
						shape = {
							...shape,
							id: `${shape.type}-${index}`,
							onDragStart: handleDragStart,
							onDragEnd: handleDragEnd,
							draggable: true,
						};

						return (
							<CanvasElement
								key={index}
								shape={shape}
								index={index}
								isSelected={shape.id === selectedId}
								onSelect={() => {
									if (shape.id) selectShape(shape?.id);
								}}
								onChange={handleChangeElement}
							/>
						);
					})}
				</Layer>
			</Stage>
		</div>
	);
};
