import { CanvasElementType } from '../../../services/canvas/canvas-element-types.enum';
import CanvasMenuButton from '../CanvasMenuButton/CanvasMenuButton';
import CanvasMenuTool from './CanvasMenuTool/CanvasMenuTool';

// ../../../../public/

export default function CanvasMenu() {
	return (
		<div className='flex gap-4 flex-col'>
			{Object.values(CanvasElementType).map((key, index) => {
				if(key === CanvasElementType.LINE) return;
				return <CanvasMenuButton key={index} type={key} />;
			})}
			<CanvasMenuTool tool={'pen'} />
		</div>
	);
}
