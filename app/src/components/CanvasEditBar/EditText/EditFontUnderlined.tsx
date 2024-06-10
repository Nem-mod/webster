import { useEffect, useState } from 'react';
import { ICanvasElement } from '../../../services/canvas/canvas.types';
import FontUnderlinedIcon from '../../SVGs/FontUnderlinedIcon';
import { Button } from '@nextui-org/react';

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
		<Button 
			size='lg'
			isIconOnly
			className={`w-fit justify-center items-center rounded hover:bg-transparent/20 ${!value ? 'bg-transparent/10' : 'bg-transparent/30'} `}
			onClick={handleClick}>
			<FontUnderlinedIcon />
		</Button>
	);
}
