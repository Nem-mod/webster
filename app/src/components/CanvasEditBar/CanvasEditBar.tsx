import { Button, Slider } from '@nextui-org/react';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { moveElements, moveElementsOneStep, updateElement } from '../../redux/slices/canvasSlice/canvas-slice';
import { CanvasElementType } from '../../services/canvas/canvas-element-types.enum';
import { ICanvasElement } from '../../services/canvas/canvas.types';
import EditFontColor from './EditText/EditFontColor';
import EditFontSizeInput from './EditText/EditFontSizeInput';

function downloadURI(uri, name) {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

interface IProps {
	stageRef: any  // LegacyRef<Konva.Stage>
}

export default function CanvasEditBar({stageRef}: IProps) {
	const dispatch = useAppDispatch();
	const selectedElements = useAppSelector((state) => state.canvas.data?.selected);
	const [color, setColor] = useState<string>('#aabbcc');
	const [colorTimeout, setColorTimeout] = useState<number>();
	const [opacity, setOpacity] = useState<number | number[]>(1);
	// Save
	const handleExport = () => {
		if (!stageRef?.current) return;
		console.log('stageRef.curret',stageRef.current)
		const uri = stageRef.current.getStage().toDataURL();
		console.log(uri);
		// we also can save uri as file
		// but in the demo on Konva website it will not work
		// because of iframe restrictions
		// but feel free to use it in your apps:
		downloadURI(uri, 'stage.jpg');
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
		<div>
			{selectedElements?.length && (
				<>
					<p>{JSON.stringify(elementsTypes)}</p>
					<HexColorPicker color={color} onChange={handleChangeColor} />
					<button
						onClick={() => {
							handleMoveMax(true);
						}}
					>
						Move Top Max
					</button>
					<br />
					<button
						onClick={() => {
							handleMoveMax(false);
						}}
					>
						Move Bot Max
					</button>
					<br />
					<button
						onClick={() => {
							handleMoveOneStep(true);
						}}
					>
						Move top
					</button>
					<br />
					<button
						onClick={() => {
							handleMoveOneStep(false);
						}}
					>
						Move bot
					</button>
					<Slider
						label='Opacity'
						step={0.01}
						maxValue={1}
						minValue={0}
						value={opacity}
						onChange={setOpacity}
						onChangeEnd={handleChangeOpacity}
						className='max-w-sm'
					/>
					{elementsTypes && elementsTypes.includes(CanvasElementType.TEXT) && (
						<>
							<EditFontSizeInput onChange={handleUpdate} />
							<EditFontColor onChange={handleUpdate} />
						</>
					)}
				</>
			)}
			<Button onClick={handleExport}>Save as image (Работает только если в канвасе нет картинки)</Button>
		</div>
	);
}
