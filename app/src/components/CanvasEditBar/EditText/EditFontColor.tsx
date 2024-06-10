import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { ICanvasElement } from '../../../services/canvas/canvas.types';
import fontColorIcon from '../../../../public/font-color.svg'
import FontColorIcon from '../../SVGs/FontColorIcon';
interface IProps {
	onChange: (value: Partial<ICanvasElement>) => void;
}

export default function EditFontColor({ onChange }: IProps) {
	const [color, setColor] = useState<string>('');
	const [colorTimeout, setColorTimeout] = useState<number>();

	const handleChange = (value: string) => {
		setColor(value);
		if (colorTimeout) {
			clearTimeout(colorTimeout);
		}

		const timeoutId = setTimeout(() => {
			onChange({ textColor: value });
		}, 500);
		setColorTimeout(timeoutId);
	};
	return (
		<Popover placement='bottom'>
			<PopoverTrigger className={'w-8'}>
				<Button isIconOnly size='lg' className={'bg-transparent/10 p-0 rounded-lg hover:bg-transparent/20'}>
					<FontColorIcon color={color}/>
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<div className='px-1 py-2'>
					<HexColorPicker color={color} onChange={handleChange} />
				</div>
			</PopoverContent>
		</Popover>
	);
}
