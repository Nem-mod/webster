import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { moveElements, moveElementsOneStep, updateElement } from '../../redux/slices/canvasSlice/canvas-slice';
export default function CanvasEditBar() {
	const dispatch = useAppDispatch();
	const selectedElements = useAppSelector((state) => state.canvas.data?.selected);
	const [color, setColor] = useState<string>('#aabbcc');

	if (!selectedElements?.length) return <></>;

	const elementsTypes = selectedElements?.map((e) => e.type);
	const handleChangeFill = (color: string) => {
		setColor(color);
		selectedElements.forEach((e) => {
			dispatch(
				updateElement({
					index: e.index,
					element: {
						fill: color,
					},
				})
			);
		});
	};

	const handleMoveOneStep = (to: boolean) => {
		dispatch(moveElementsOneStep({ to }));
	};

	return (
		<div>
			<p>{JSON.stringify(elementsTypes)}</p>
			<HexColorPicker color={color} onChange={handleChangeFill} />
			<button
				onClick={() => {
					dispatch(moveElements({ to: true }));
				}}
			>
				Move Top Max
			</button>
			<br />
			<button
				onClick={() => {
					dispatch(moveElements({ to: false }));
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
		</div>
	);
}
