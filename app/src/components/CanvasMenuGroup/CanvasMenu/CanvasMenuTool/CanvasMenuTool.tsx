import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setTool } from "../../../../redux/slices/canvasSlice/canvas-slice";
import { ToolOperationType } from "../../../../redux/slices/canvasSlice/canvas-slice.types";

interface IProps {
	tool: ToolOperationType;
}

export default function CanvasMenuTool({ tool }: IProps) {
	const dispatch = useAppDispatch();
	const activeTool = useAppSelector(state => state.canvas.data?.activeTool);

	const handleClick = () => {
		if (activeTool === tool) {
			dispatch(setTool({tool: ''}));
			return;
		}
		dispatch(setTool({ tool }));
	};
	return (
		<div>
			<button onClick={handleClick} className={`p-2 w-32 ${activeTool === tool ? 'bg-red-500' : 'bg-green-500'}`}>
				{tool}
			</button>
		</div>
	);
}
