import { useEffect, useState } from 'react';
import { ICanvasElement } from '../../../services/canvas/canvas.types';
import FontItalicIcon from '../../SVGs/FontItalicIcon';

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
		<div className='inline-flex w-8 h-8'>
			<div className={`w-full flex justify-center items-center rounded ${value && 'bg-white'} `} onClick={handleClick}>
				<FontItalicIcon />
			</div>
		</div>
	);
}
