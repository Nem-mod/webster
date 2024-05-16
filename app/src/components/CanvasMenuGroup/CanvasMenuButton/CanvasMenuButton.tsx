import { useAppDispatch } from '../../../hooks/redux';
import { addElement } from '../../../redux/slices/canvasSlice/canvas-slice';
import { CanvasElementType } from '../../../services/canvas/canvas-element-types.enum';
import CanvasElementFactory from '../../../services/canvas/canvas.service';

interface IProps {
	type: CanvasElementType;
}

export default function CanvasMenuButton({ type }: IProps) {
	const dispatch = useAppDispatch();

	const handleClick = () => {
		const creator = CanvasElementFactory.getCreator(type);
		console.log('creator', creator);
		const element = creator();
		console.log('element', element);
		dispatch(addElement(element));
	};
	return (
		<div>
			<button onClick={handleClick} className={'bg-blue-500 p-2 w-32'}>
				{type}
			</button>
		</div>
	);
}
