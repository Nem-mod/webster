import { Button, Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { ICanvasElement } from '../../../services/canvas/canvas.types';

interface IProps {
	onChange: (value: Partial<ICanvasElement>) => void;
	fontSize: number;
}

export default function EditFontSizeInput({ onChange, fontSize }: IProps) {
	const [value, setValue] = useState(`${fontSize}`);
	const handleChange = (value: string) => {
		setValue(value);
	};

	useEffect(() => {
		onChange({ fontSize: +value });
	}, [value]);

	const handleClick = (value: number) => {
		setValue((prev) => `${Number(prev) + value}`);
	};
	return (
		<div className={'w-full flex max-w-[90px]'}>
			<button
				className={'bg-white w-8 rounded-l-md'}
				onClick={() => handleClick(1)}
			>
				+
			</button>
			<Input
				type={'number'}
				radius={'none'}
				value={value}
				size={'md'}
				className={'h-full'}
				classNames={{
					inputWrapper : 'h-full'
				}}
				onValueChange={handleChange}
			/>
			<button
				className={'bg-white w-8 rounded-r-md'}
				onClick={() => handleClick(-1)}
			>
				-
			</button>
		</div>
	);
}
