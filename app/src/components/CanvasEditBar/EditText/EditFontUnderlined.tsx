import { useEffect, useState } from 'react';
import { ICanvasElement } from '../../../services/canvas/canvas.types';
import FontUnderlinedIcon from '../../SVGs/FontUnderlinedIcon';

interface IProps {
	onChange: (value: Partial<ICanvasElement>) => void;
	currentValue: boolean;
}

export default function EditFontUnderlined({ currentValue, onChange }: IProps) {
	const [value, setValue] = useState<boolean>(currentValue);
	useEffect(() => {
		onChange({ textDecoration: value ? 'underline' : '' });
	}, [value]);

	const handleClick = () => setValue((prev) => !prev);

	return (
		<div className='inline-flex w-8 h-8'>
			<div className={`w-full flex justify-center items-center rounded ${value && 'bg-white'} `} onClick={handleClick}>
				<FontUnderlinedIcon />
			</div>
		</div>
	);
}
