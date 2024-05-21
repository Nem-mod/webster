import { useDispatch } from 'react-redux';
import { reviewHistory } from '../../../redux/slices/canvasSlice/canvas-slice';
import { CanvasElementType } from '../../../services/canvas/canvas-element-types.enum';
import CanvasMenuButton from '../CanvasMenuButton/CanvasMenuButton';

export default function CanvasMenu() {
	const dispatch = useDispatch();
	const handleHC = (type: boolean) => {
		dispatch(reviewHistory({ type }));
	};
	return (
		<div>
			{Object.values(CanvasElementType).map((key, index) => {
				return <CanvasMenuButton key={index} type={key} />;
			})}
			<CanvasMenuButton type={CanvasElementType.CIRCLE} />
			<button onClick={() => handleHC(true)}>Back</button>
			<button onClick={() => handleHC(false)}>Forward</button>
		</div>
	);
}
