import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { useEffect, useRef, useState } from 'react';
import { setSelectedElements } from '../../redux/slices/canvasSlice/canvas-slice';
import { useAppDispatch } from '../redux';

interface IUseTransitionRes {
	trRef: any; // MutableRefObject<Konva.Transformer | undefined>;
	layerRef: any; //MutableRefObject<Konva.Layer | undefined>;
	selectionRectRef: any;
	checkDeselect: (e: any) => void;
	updateSelectionRect: () => void;
	onMouseDown: (e: KonvaEventObject<MouseEvent>) => void;
	onMouseMove: (e: KonvaEventObject<MouseEvent>) => void;
	onMouseUp: () => void;
	onClickTap: (e: KonvaEventObject<MouseEvent>) => void;
}

export default function useCanvasTransition(): IUseTransitionRes {
	const dispatch = useAppDispatch();
	const trRef = useRef<any>();
	const layerRef = useRef<any>();
	const [selectedIds, selectShapes] = useState([]);
	useEffect(() => {
		const selectedIndexes = selectedIds.map((e: string) => {
			return +e.split('-')[1];
		});
		dispatch(setSelectedElements({ elementIndexes: selectedIndexes }));
	}, [selectedIds]);

	useEffect(() => {
		if (layerRef.current) {
			const nodes = selectedIds.map((id) => layerRef.current?.findOne('#' + id));
			//@ts-expect-error
			if (trRef.current) trRef?.current.nodes(nodes);
		}
	}, [selectedIds]);

	const checkDeselect = (e: Konva.KonvaEventObject<TouchEvent>) => {
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
	};

	const oldPos = useRef(null);

	const onMouseDown = (e: KonvaEventObject<MouseEvent>) => {
		const isElement = e.target.findAncestor('.elements-container');
		const isTransformer = e.target.findAncestor('Transformer');
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

	const onMouseMove = (e: KonvaEventObject<MouseEvent>) => {
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
		layerRef.current.find('.rectangle').forEach((elementNode: Konva.Node) => {
			const elBox = elementNode.getClientRect();
			if (Konva.Util.haveIntersection(selBox, elBox)) {
				elements.push(elementNode);
			}
		});
		console.log('elements	', elements);
		selectShapes(elements.map((el) => el.id()));
		updateSelectionRect();
	};

	const onClickTap = (e: KonvaEventObject<MouseEvent>) => {
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
		console.log('e.target', e.target);
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

	return { trRef, layerRef, selectionRectRef, checkDeselect, updateSelectionRect, onMouseDown, onMouseUp, onMouseMove, onClickTap };
}
