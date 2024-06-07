import { useEffect, useState } from 'react';
import { ICanvasElement } from '../../../services/canvas/canvas.types';
import FontBoldIcon from '../../SVGs/FontBoldIcon';

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
		<div className='inline-flex w-8 h-8'>
			<div className={`w-full flex justify-center items-center rounded ${value && 'bg-white'} `} onClick={handleClick}>
				<FontBoldIcon />
			</div>
		</div>
	);
}
