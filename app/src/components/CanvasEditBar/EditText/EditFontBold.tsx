import { useEffect, useState } from 'react';
import { ICanvasElement } from '../../../services/canvas/canvas.types';
import FontBoldIcon from '../../SVGs/FontBoldIcon';
import { Button } from '@nextui-org/react';

interface IProps {
	onChange: (value: Partial<ICanvasElement>) => void;
	currentValue: boolean;
}

export default function EditFontFamily({ currentValue, onChange }: IProps) {
	const [value, setValue] = useState<boolean>(currentValue);
	useEffect(() => {
		onChange({ fontStyle: value ? 'bold' : '' });
	}, [value]);

	const handleClick = () => setValue((prev) => !prev);

	return (
		// <div className='w-8 h-8'>
			<Button 
				size='lg'
				isIconOnly 
				className={`w-fit flex justify-center items-center rounded hover:bg-transparent/20 ${!value ? 'bg-transparent/10' : 'bg-transparent/30'} `} 
				onClick={handleClick}
			>
				<FontBoldIcon />
			</Button>
		// </div>
	);
}
