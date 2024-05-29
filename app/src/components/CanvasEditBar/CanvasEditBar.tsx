import { Slider } from '@nextui-org/react';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { moveElements, moveElementsOneStep, updateElement } from '../../redux/slices/canvasSlice/canvas-slice';
import { CanvasElementType } from '../../services/canvas/canvas-element-types.enum';
import { ICanvasElement } from '../../services/canvas/canvas.types';
import EditFontColor from './EditText/EditFontColor';
import EditFontSizeInput from './EditText/EditFontSizeInput';

export default function CanvasEditBar() {
	const dispatch = useAppDispatch();
	const selectedElements = useAppSelector((state) => state.canvas.data?.selected);
	const [color, setColor] = useState<string>('#aabbcc');
	const [colorTimeout, setColorTimeout] = useState<number>();
	const [opacity, setOpacity] = useState<number | number[]>(1);
	if (!selectedElements?.length) return <></>;

	const elementsTypes = selectedElements?.map((e) => e.type);
	const handleUpdate = (value: Partial<ICanvasElement>) => {
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
			{elementsTypes.includes(CanvasElementType.TEXT) && (
				<>
					<EditFontSizeInput onChange={handleUpdate} />
					<EditFontColor onChange={handleUpdate} />
				</>
			)}
		</div>
	);
}
