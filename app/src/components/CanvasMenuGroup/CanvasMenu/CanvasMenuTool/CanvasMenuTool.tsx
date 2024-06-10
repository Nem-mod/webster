import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setTool } from "../../../../redux/slices/canvasSlice/canvas-slice";
import { ToolOperationType } from "../../../../redux/slices/canvasSlice/canvas-slice.types";
import { Button } from "@nextui-org/react"
import { Image } from "@nextui-org/react"


interface IProps {
	tool: ToolOperationType;
}

const toolsIcons = {
	pen: '"../../../../../public/pen_icon.png'
}



export default function CanvasMenuTool({ tool }: IProps) {
	const dispatch = useAppDispatch();
	const activeTool = useAppSelector(state => state.canvas.data?.activeTool);

	const handleClick = () => {
		if (activeTool?.tool === tool) {
			dispatch(setTool({tool: '', color: '#000000'}));
			return;
		}
		dispatch(setTool({ tool, color: '#000000' }));
	};
	return (
		<Button isIconOnly size="sm" onClick={handleClick} className={`p-2 ${activeTool?.tool === tool ? 'bg-red-500' : 'bg-green-500'}`}>
			{/* {tool}
			<image href={icons[tool]}/> */}
			<Image src={toolsIcons[tool]} width={20} height={20} radius="none"/>
		</Button>
	);
}
