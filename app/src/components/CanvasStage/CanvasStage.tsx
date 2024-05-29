import Konva from 'konva';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Layer, Rect, Stage, Transformer } from 'react-konva';
import useCanvasTransition from '../../hooks/canvas/useTransition';
import { useAppDispatch } from '../../hooks/redux';
import { addElement, deleteElement, ICanvasState, reviewHistory, updateElement } from '../../redux/slices/canvasSlice/canvas-slice';
import { ICanvasElement } from '../../services/canvas/canvas.types';
import CanvasElement from './CanvasElement';
import { useDropzone } from 'react-dropzone';
import { FileUploaderService } from '../../services/file-uploader/file-uploader.service';
import { CanvasElementType } from '../../services/canvas/canvas-element-types.enum';

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

	// TODO: Refactor code, use custom hooks to short code 
export const CanvasStage = ({ canvasState, dimensions }: Props) => {
	const shapes = canvasState.data?.elements;
	const dispatch = useAppDispatch();
	const divRef = useRef<HTMLInputElement>(null);

	const { trRef, layerRef, selectionRectRef, checkDeselect, onMouseDown, onMouseUp, onMouseMove, onClickTap } = useCanvasTransition(
		canvasState.data?.selected || []
	);
	const [stageScale, setStageScale] = useState({
		scale: 1,
		stageX: 0,
		stageY: 0,
	});

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

	useEffect(() => {
		const callback = (event: KeyboardEvent) => {
			const handleMoveHistory = (type: boolean) => {
				dispatch(reviewHistory({ type }));
			};

			if ((event.metaKey || event.ctrlKey) && event.code === 'KeyZ') {
				handleMoveHistory(true);
			}
			if ((event.metaKey || event.ctrlKey) && event.code === 'KeyY') {
				handleMoveHistory(false);
			}
			if (event.key === 'Delete') {
				dispatch(deleteElement());
			}
		};
		document.addEventListener('keydown', callback);
		return () => {
			document.removeEventListener('keydown', callback);
		};
	}, []);

	// File Drop Zone
	const onDrop = useCallback((acceptedFiles: File[]) => {
		acceptedFiles.forEach((file: File) => {
			if(file.type.includes('image')) {
				FileUploaderService.uploadImage(file).then((res: string) => {
					dispatch(addElement({
						type: CanvasElementType.IMAGE,
						src: res,
						// TODO: Create Image element on point of drop if it possible
						x: 100,
						y: 100,
					}))
				});
			}
		} )
	}, []);
	
	const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true});

	return (
		<div ref={divRef}>
			<div  {...getRootProps()}>
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

							return <CanvasElement key={index} getKey={index} shape={shape} index={index} onChange={handleChangeElement} />;
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
						<Rect fill='rgba(0,0,255,0.5)' x={0} y={0} width={100} opacity={0} height={100} ref={selectionRectRef} />
					</Layer>
				</Stage>
				<input {...getInputProps()} type={'file'} className={'hidden'} accept={'image/*'}/>
			</div>
		</div>
	);
};
