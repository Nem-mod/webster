import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { ToolOperationType } from '../../../redux/slices/canvasSlice/canvas-slice.types';
import { useAppDispatch } from '../../../hooks/redux';
import { setTool } from '../../../redux/slices/canvasSlice/canvas-slice';

interface IProps {
	activeTool: {
		tool: ToolOperationType;
		color: string;
	};
}

export const EditPenColor = ({ activeTool }: IProps) => {
	const dispatch = useAppDispatch();
	const [color, setColor] = useState<string>(activeTool.color || '#aabbcc');

	const handleChangeColor = (value: string) => {
		setColor(value);
		dispatch(setTool({ tool: activeTool.tool, color: color }));
	};
	return (
		<>
			<Popover>
				<PopoverTrigger>
					<div className={'flex'}>
						<div className={'rounded h-8 w-8 flex overflow-hidden'}>
							<div
								className='w-full'
								style={{ backgroundColor: color || '#FF0000' }}
							></div>
						</div>
					</div>
				</PopoverTrigger>
				<PopoverContent>
					<HexColorPicker color={color} onChange={handleChangeColor} />
				</PopoverContent>
			</Popover>
		</>
	);
};
