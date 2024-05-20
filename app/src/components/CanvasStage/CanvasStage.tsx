import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { useEffect, useRef, useState } from 'react';
import { Layer, Rect, Stage, Transformer } from 'react-konva';
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
	const shapes = canvasState.data?.elements;
	const dispatch = useAppDispatch();
	const divRef = useRef<HTMLInputElement>(null);

	const [stageScale, setStageScale] = useState({
		scale: 1,
		stageX: 0,
		stageY: 0,
	});

	// const [selectedId, selectShape] = useState<string | null>(null);
	const trRef = useRef<any>();
	const layerRef = useRef<any>();
	const [selectedIds, selectShapes] = useState([]);

	useEffect(() => {
		console.log('selectedIds', selectedIds);
		const nodes = selectedIds.map((id) => layerRef.current.findOne('#' + id));
		trRef.current.nodes(nodes);
	}, [selectedIds]);

	const checkDeselect = (e) => {
		// deselect when clicked on empty area
		const clickedOnEmpty = e.target === e.target.getStage();
		if (clickedOnEmpty) {
			// selectShape(null);
			selectShapes([]);
		}
	};

	const selectionRectRef = useRef<any>();
	const selection = useRef({
		visible: false,
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
	});

	const updateSelectionRect = () => {
		const node = selectionRectRef.current;
		node.setAttrs({
			visible: selection.current.visible,
			x: Math.min(selection.current.x1, selection.current.x2),
			y: Math.min(selection.current.y1, selection.current.y2),
			width: Math.abs(selection.current.x1 - selection.current.x2),
			height: Math.abs(selection.current.y1 - selection.current.y2),
			fill: 'rgba(0, 161, 255, 0.3)',
		});
		node.getLayer().batchDraw();
		console.log('updateSelectionRect');
	};

	const oldPos = useRef(null);

	const onMouseDown = (e: any) => {
		console.log('e', e);
		const isElement = e.target.findAncestor('.elements-container');
		const isTransformer = e.target.findAncestor('Transformer');
		console.log('isElement', isElement);
		console.log('isTransformer', isTransformer);
		if (isElement || isTransformer) {
			return;
		}

		const pos = e.target.getStage()?.getPointerPosition();
		if (!pos) return;
		selection.current.visible = true;
		selection.current.x1 = pos.x;
		selection.current.y1 = pos.y;
		selection.current.x2 = pos.x;
		selection.current.y2 = pos.y;
		updateSelectionRect();
	};

	const onMouseMove = (e: KonvaEventObject<Event>) => {
		if (!selection.current.visible) {
			return;
		}
		const pos = e.target.getStage()?.getPointerPosition();
		if (!pos) return;
		selection.current.x2 = pos.x;
		selection.current.y2 = pos.y;
		updateSelectionRect();
	};

	const onMouseUp = () => {
		oldPos.current = null;
		selection.current.visible = false;
		const { x1, x2, y1, y2 } = selection.current;
		const moved = x1 !== x2 || y1 !== y2;
		if (!moved) {
			updateSelectionRect();
			return;
		}
		const selBox = selectionRectRef.current.getClientRect();

		const elements: unknown[] = [];
		layerRef.current.find('.rectangle').forEach((elementNode) => {
			const elBox = elementNode.getClientRect();
			if (Konva.Util.haveIntersection(selBox, elBox)) {
				elements.push(elementNode);
			}
		});

		selectShapes(elements.map((el) => el.id()));
		updateSelectionRect();
	};

	const onClickTap = (e) => {
		// if we are selecting with rect, do nothing
		const { x1, x2, y1, y2 } = selection.current;
		const moved = x1 !== x2 || y1 !== y2;
		if (moved) {
			return;
		}
		let stage = e.target.getStage();
		let layer = layerRef.current;
		let tr = trRef.current;
		// if click on empty area - remove all selections
		if (e.target === stage) {
			selectShapes([]);
			return;
		}

		// do nothing if clicked NOT on our rectangles
		if (!e.target.hasName('canvas-element')) {
			return;
		}

		// do we pressed shift or ctrl?
		const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
		const isSelected = tr.nodes().indexOf(e.target) >= 0;

		if (!metaPressed && !isSelected) {
			// if no key pressed and the node is not selected
			// select just one
			selectShapes([e.target.id()]);
		} else if (metaPressed && isSelected) {
			// if we pressed keys and node was selected
			// we need to remove it from selection:
			selectShapes((oldShapes) => {
				return oldShapes.filter((oldId) => oldId !== e.target.id());
			});
		} else if (metaPressed && !isSelected) {
			// add the node into selection
			selectShapes((oldShapes) => {
				return [...oldShapes, e.target.id()];
			});
		}
		layer.draw();
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
		// console.log('handleChangeElement');
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
				onMouseDown={onMouseDown}
				onMouseUp={onMouseUp}
				onMouseMove={onMouseMove}
				onTouchStart={checkDeselect}
				onClick={onClickTap}
				onTap={onClickTap}
			>
				<Layer ref={layerRef}>
					{shapes?.map((shape, index) => {
						shape = {
							...shape,
							id: `${shape.type}-${index}`,
							draggable: true,
						};

						return (
							<CanvasElement
								key={index}
								getKey={index}
								shape={shape}
								index={index}
								onChange={handleChangeElement}
							/>
						);
					})}
					<Transformer
						// ref={trRef.current[getKey]}
						ref={trRef}
						boundBoxFunc={(oldBox, newBox) => {
							if (newBox.width < 5 || newBox.height < 5) {
								return oldBox;
							}
							return newBox;
						}}
					/>
					<Rect fill='rgba(0,0,255,0.5)' x={0} y={0} width={100} height={100} ref={selectionRectRef} />
				</Layer>
			</Stage>
		</div>
	);
};
