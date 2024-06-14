import { useEffect, useState } from 'react';
import { ICanvasElement } from '../../../services/canvas/canvas.types';
import FontItalicIcon from '../../SVGs/FontItalicIcon';
import { Button } from '@nextui-org/react';

interface IProps {
	onChange: (value: Partial<ICanvasElement>) => void;
	currentValue: boolean;
}

export default function EditFontItalic({ currentValue, onChange }: IProps) {
	const [value, setValue] = useState<boolean>(currentValue);
	useEffect(() => {
		onChange({ fontVariant: value ? 'italic' : '' });
	}, [value]);

	const handleClick = () => setValue((prev) => !prev);

	return (
		<Button 
			size='lg'
			isIconOnly
			className={`w-fit justify-center items-center rounded hover:bg-transparent/20 ${!value ? 'bg-transparent/10' : 'bg-transparent/30'} `} 
			onClick={handleClick}
		>
			<FontItalicIcon />
		</Button>
	);
}
