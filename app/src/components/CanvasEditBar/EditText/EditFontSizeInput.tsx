import { Input } from '@nextui-org/react';
import { useState } from 'react';
import { ICanvasElement } from '../../../services/canvas/canvas.types';

interface IProps {
	onChange: (value: Partial<ICanvasElement>) => void;
}

export default function EditFontSizeInput({ onChange }: IProps) {
	const [value, setValue] = useState('');
	const handleChange = (value: string) => {
		setValue(value);
		onChange({ fontSize: +value });
	};
	return (
		<div className={'w-full flex flex-col gap-2 max-w-[240px]'}>
			<Input label={'fontSize'} type={'number'} value={value} onValueChange={handleChange} />
		</div>
	);
}
