import Konva from 'konva';
import {EventHandler, useCallback, useEffect, useRef, useState} from 'react';
import { Layer, Line, Rect, Stage, Transformer } from 'react-konva';
import useCanvasTransition from '../../hooks/canvas/useTransition';
import { useAppDispatch } from '../../hooks/redux';
import { addElement, ICanvasState, updateElement } from '../../redux/slices/canvasSlice/canvas-slice';
import { ICanvasElement } from '../../services/canvas/canvas.types';
import CanvasElement from './CanvasElement';
import { useDropzone } from 'react-dropzone';
import { FileUploaderService } from '../../services/file-uploader/file-uploader.service';
import { CanvasElementType } from '../../services/canvas/canvas-element-types.enum';
import { useDraw } from '../../hooks/canvas/useDraw';
import CanvasEditBar from '../CanvasEditBar/CanvasEditBar';
import useCanvasKeyboard from '../../hooks/canvas/useCanvasKeyboard';
import useWheel from '../../hooks/canvas/useWheel';

interface Props {
	canvasState: ICanvasState;
	dimensions: {
		width: number;
		height: number;
	};
	stageRef: any;
	stageWrapperRef: any;
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

	// TODO: Refactor code, use custom hooks to short code 
export const CanvasStage = ({ canvasState, dimensions, stageRef, stageWrapperRef }: Props) => {
	const defaultScale = Math.min(624.9857 * Math.pow(Math.max(dimensions.height, dimensions.width), -0.993), 0.9);

	console.log(defaultScale)

	const divRef = useRef<HTMLInputElement>(null);
	const [stageScale, setStageScale] = useState({
		scale: 1,
		stageX: 0,
		stageY: 0,
	});
	const [containerScale, setContainerScale] = useState({
		scale: defaultScale,
		marginX: 0,
		marginY: 0,
		cursorPosX: dimensions.width / 2,
		cursorPosY: dimensions.height / 2
	});
	const {line, tool, drawingHandleMouseDown, drawingHandleMouseMove, drawingHandleMouseUp} = useDraw();
	const { trRef, layerRef, selectionRectRef, checkDeselect, onMouseDown, onMouseUp, onMouseMove, onClickTap } = useCanvasTransition(
		canvasState.data?.selected || []
	);

	const shapes = canvasState.data?.elements;
	const dispatch = useAppDispatch();

	useCanvasKeyboard();

	const handleChangeElement = (index: number, element: Partial<ICanvasElement>) => {
		dispatch(
			updateElement({
				index,
				element,
			})
		);
	};

	useEffect(() => {
		const scrollHandler = (event: WheelEvent) => {
			const scaleBy = 1.1;
			const scrollDist = 20;

			const minScale = defaultScale;
			const maxScale = 5;

			const canvasBounds = divRef.current?.getBoundingClientRect() as DOMRect;

			event.preventDefault()
			if (event.ctrlKey) {
				let newScale = 1;

				if (event.deltaY > 0)
					newScale = containerScale.scale / scaleBy
				if (event.deltaY <= 0)
					newScale = containerScale.scale * scaleBy

				if (newScale > maxScale || newScale < minScale)
					return

				const mouseRelativeCanvasCoords = {
					x: Math.min(Math.max((event.x - canvasBounds.left) / containerScale.scale, 0), dimensions.width),
					y: Math.min(Math.max((event.y - canvasBounds.top) / containerScale.scale, 0), dimensions.height),
				};

				console.log(newScale)

				setContainerScale({
					...containerScale,
					cursorPosX: mouseRelativeCanvasCoords.x,
					cursorPosY: mouseRelativeCanvasCoords.y,
					scale: newScale
				})
			} else if (event.shiftKey) {
				const scaledScrollDist = scrollDist * containerScale.scale
				const newMarginX = Math.round((event.deltaY > 0 ? containerScale.marginX - scaledScrollDist : containerScale.marginX + scaledScrollDist) * 10) / 10

				setContainerScale({
					...containerScale,
					marginX: newMarginX
				})
			} else {
				const scaledScrollDist = scrollDist * containerScale.scale
				const newStageY = event.deltaY > 0 ? containerScale.marginY - scaledScrollDist : containerScale.marginY + scaledScrollDist

				setContainerScale({
					...containerScale,
					marginY: newStageY
				})
			}
		}

		if (stageWrapperRef)
			stageWrapperRef.current?.addEventListener('wheel', scrollHandler)

		return () => {
			if (stageWrapperRef)
				stageWrapperRef.current?.removeEventListener('wheel', scrollHandler);
		}
	}, [containerScale]);

	// File Drop Zone
	const onDrop = useCallback((acceptedFiles: File[]) => {
		acceptedFiles.forEach((file: File) => {
			if(file.type.includes('image')) {
				FileUploaderService.uploadImage(file).then((res: string) => {
					dispatch(addElement({
						type: CanvasElementType.IMAGE,
						src: res?.url,
						// TODO: Create Image element on point of drop if it possible
						x: 100,
						y: 100,
					}))
				});
			}
		} )
	}, []);
	const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true});

	return ( // TODO: calc default scale for wrapper. change it on wheel + ctrl. use margin for scrolling. don't scale/scroll canvas
			<div {...getRootProps()} ref={divRef} className={`border-2 border-accent-dark`}
					 style={{transform: `scale(${containerScale.scale})`,
						 marginLeft: `${containerScale.marginX}px`,
						 marginTop: `${containerScale.marginY}px`,
					 transformOrigin: `${containerScale.cursorPosX}px ${containerScale.cursorPosY}px`}}>
				<Stage
					ref={stageRef}
					// onMouseOver={(e: Konva.KonvaEventObject<MouseEvent>) => { console.log(e.evt) }}
					// onWheel={handleWheel}
					scaleX={stageScale.scale}
					scaleY={stageScale.scale}
					x={stageScale.stageX}
					y={stageScale.stageY}
					width={dimensions.width}
					height={dimensions.height}
					// container={'container'}
					// pixelRatio={2}
					onMouseDown={tool ? drawingHandleMouseDown : onMouseDown}
					onMouseUp={tool ? drawingHandleMouseUp : onMouseUp}
					onMouseMove={tool ? drawingHandleMouseMove : onMouseMove}
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

							return <CanvasElement key={index} getKey={index} shape={shape} index={index} onChange={handleChangeElement} />;
						})}
						{line && <Line points={line.points} stroke='#df4b26' strokeWidth={5} tension={0.5} lineCap='round' lineJoin='round' />}
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
						<Rect fill='rgba(0,0,255,0.5)' x={0} y={0} width={100} opacity={0} height={100} ref={selectionRectRef} />
					</Layer>
				</Stage>
				<input {...getInputProps()} type={'file'} className={'hidden'} accept={'image/*'} />
			</div>
	);
};
