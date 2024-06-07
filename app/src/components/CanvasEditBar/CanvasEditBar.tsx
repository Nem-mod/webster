import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
	moveElements,
	moveElementsOneStep,
	setSelectedElements,
	updateElement,
} from '../../redux/slices/canvasSlice/canvas-slice';
import { CanvasElementType } from '../../services/canvas/canvas-element-types.enum';
import { ICanvasElement } from '../../services/canvas/canvas.types';
import EditFontColor from './EditText/EditFontColor';
import EditFontSizeInput from './EditText/EditFontSizeInput';

import { Button, Slider } from '@nextui-org/react';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import ImageEditFilter from './ImageFilter/ImageEditFilter';

function downloadURI(uri, name) {
	const link = document.createElement('a');
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

interface IProps {
	stageRef: any; // LegacyRef<Konva.Stage>
}

export default function CanvasEditBar({ stageRef }: IProps) {
	const dispatch = useAppDispatch();
	const selectedElements = useAppSelector(
		(state) => state.canvas.data?.selected
	);
	const [color, setColor] = useState<string>('#aabbcc');
	const [colorTimeout, setColorTimeout] = useState<number>();
	const [opacity, setOpacity] = useState<number | number[]>(1);
	const [crop, setCrop] = useState<{
		x: number;
		y: number;
		width: number;
		height: number;
	}>({
		x: 0,
		y: 0,
		width: selectedElements ? selectedElements[0]?.image?.naturalWidth : 100,
		height: selectedElements ? selectedElements[0]?.image?.naturalHeight : 100,
	});
	const [zoom, setZoom] = useState(1);
	// Save
	const handleExport = async () => {
		if (!stageRef?.current) return; // TODO: Set default scale and position before saving
		await dispatch(setSelectedElements({ elementIndexes: [] }));
		const uri = stageRef.current.getStage().toDataURL();
		// we also can save uri as file
		// but in the demo on Konva website it will not work
		// because of iframe restrictions
		// but feel free to use it in your apps:
		downloadURI(uri, 'stage.png');
	};
	// EDIT
	const elementsTypes = selectedElements?.map((e) => e.type);
	const handleUpdate = (value: Partial<ICanvasElement>) => {
		if (!selectedElements) return;
		selectedElements.forEach((e) => {
			dispatch(
				updateElement({
					index: e.index,
					element: {
						...value,
					},
				})
			);
		});
	};

	const handleChangeColor = (value: string) => {
		setColor(value);
		if (colorTimeout) {
			clearTimeout(colorTimeout);
		}

		const timeoutId = setTimeout(() => {
			handleUpdate({
				fill: value,
			});
		}, 500);
		setColorTimeout(timeoutId);
	};

	const handleCropImage = () => {
		handleUpdate({
			crop: { ...crop },
		});
		console.log(selectedElements);
	};

	const handleChangeOpacity = () => {
		handleUpdate({
			opacity: opacity as number,
		});
	};

	const handleMoveMax = (to: boolean) => {
		dispatch(moveElements({ to }));
	};
	const handleMoveOneStep = (to: boolean) => {
		dispatch(moveElementsOneStep({ to }));
	};

	return (
		<>
			{selectedElements?.length && (
				<div
					className={'flex flex-row px-4 gap-4 border border-black rounded-md'}
				>
					{/* <p>{JSON.stringify(elementsTypes)}</p> */}
					<Popover>
						<PopoverTrigger>
							<div className={'flex'}>
								<div className={'m-auto rounded h-8 w-8 flex'}>
									{selectedElements
										.filter((element) => element.fill)
										.map((element, index, array) => {
											const flexBasis = 100 / array.length;
											return (
												<div
													key={element.index}
													style={{
														backgroundColor: `${element.fill}`,
														flexBasis: `${flexBasis}%`,
													}}
												></div>
											);
										})}
								</div>
							</div>
						</PopoverTrigger>
						<PopoverContent>
							<HexColorPicker color={color} onChange={handleChangeColor} />
						</PopoverContent>
					</Popover>
					<Popover>
						<PopoverTrigger>
							<Button>Layers</Button>
						</PopoverTrigger>
						<PopoverContent className={'p-4 flex flex-col items-stretch'}>
							<Button
								onClick={() => {
									handleMoveMax(true);
								}}
							>
								Top Layer
							</Button>
							<br />
							<Button
								onClick={() => {
									handleMoveMax(false);
								}}
							>
								Bottom Layer
							</Button>
							<br />
							<Button
								onClick={() => {
									handleMoveOneStep(true);
								}}
							>
								Layer Up
							</Button>
							<br />
							<Button
								onClick={() => {
									handleMoveOneStep(false);
								}}
							>
								Layer Down
							</Button>
						</PopoverContent>
					</Popover>

					<Popover>
						<PopoverTrigger>
							<Button>Opacity</Button>
						</PopoverTrigger>
						<PopoverContent className='w-[240px] py-2'>
							<div className={''}>
								<Slider
									label='Opacity'
									step={0.01}
									maxValue={1}
									minValue={0}
									value={opacity}
									onChange={setOpacity}
									onChangeEnd={handleChangeOpacity}
									className='w-[200px]'
								/>
							</div>
						</PopoverContent>
					</Popover>

					{elementsTypes && elementsTypes.includes(CanvasElementType.TEXT) && (
						<>
							<EditFontSizeInput
								fontSize={
									selectedElements.find((e) => e.type == CanvasElementType.TEXT)
										?.fontSize || 16
								}
								onChange={handleUpdate}
							/>
							<EditFontColor onChange={handleUpdate} />
						</>
					)}
					{elementsTypes && elementsTypes.includes(CanvasElementType.IMAGE) && (
						<>
							<ImageEditFilter
								elements={selectedElements.filter(
									(e) => e.type === CanvasElementType.IMAGE
								)}
							/>
						</>
					)}

					{elementsTypes &&
						elementsTypes.includes(CanvasElementType.IMAGE) &&
						selectedElements.length === 1 && (
							<Popover>
								<PopoverTrigger>
									<Button>Crop image</Button>
								</PopoverTrigger>
								<PopoverContent>
									<div className='flex flex-col gap-2'>
										<Slider
											label='X'
											step={1}
											maxValue={selectedElements[0].width}
											minValue={0}
											value={crop.x}
											onChange={(value) => {
												console.log(selectedElements);
												setCrop({
													...crop,
													x: value as number,
												});
											}}
											onChangeEnd={handleCropImage}
											className='w-[200px]'
										/>
										<Slider
											label='Y'
											step={1}
											maxValue={selectedElements[0].height}
											minValue={0}
											value={crop.y}
											onChange={(value) => {
												setCrop({
													...crop,
													y: value as number,
												});
											}}
											onChangeEnd={handleCropImage}
											className='w-[200px]'
										/>
										<Slider
											label='Width'
											step={1}
											maxValue={selectedElements[0].imageWidth}
											minValue={1}
											value={selectedElements[0].imageWidth - crop.width}
											onChange={(value) => {
												setCrop({
													...crop,
													width:
														selectedElements[0].imageWidth - (value as number),
												});
											}}
											onChangeEnd={handleCropImage}
											className='w-[200px]'
										/>
										<Slider
											label='Height'
											step={1}
											maxValue={selectedElements[0].imageHeight}
											minValue={1}
											value={selectedElements[0].imageHeight - crop.height}
											onChange={(value) => {
												setCrop({
													...crop,
													height:
														selectedElements[0].imageHeight - (value as number),
												});
											}}
											onChangeEnd={handleCropImage}
											className='w-[200px]'
										/>
										<Slider
											label='Zoom'
											step={0.1}
											maxValue={3}
											minValue={1}
											value={zoom}
											onChange={(value) => {
												setZoom(value as number);
												setCrop({
													...crop,
													height: selectedElements[0].height * zoom,
													width: selectedElements[0].width * zoom,
												});
											}}
											onChangeEnd={handleCropImage}
											className='w-[200px]'
										/>
										<Button
											onClick={() => {
												handleUpdate({ crop: null });
											}}
										>
											Disable Crop
										</Button>
									</div>
								</PopoverContent>
							</Popover>
						)}
				</div>
			)}
			<Button onClick={handleExport}>
				Save as image (Работает только если в канвасе нет картинки)
			</Button>
		</>
	);
}
