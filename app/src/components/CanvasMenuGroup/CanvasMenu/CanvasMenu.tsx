import { CanvasElementType } from '../../../services/canvas/canvas-element-types.enum';
import CanvasMenuButton from '../CanvasMenuButton/CanvasMenuButton';

export default function CanvasMenu() {
	return (
		<div>
			{Object.values(CanvasElementType).map((key, index) => {
				return <CanvasMenuButton key={index} type={key} />;
			})}
			<CanvasMenuButton type={CanvasElementType.CIRCLE} />
		</div>
	);
}
