import { Select, SelectItem } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { ICanvasElement } from '../../../services/canvas/canvas.types';

export const fonts = [
	'Arial',
	'Verdana',
	'Tahoma',
	'Trebuchet MS',
	'Times New Roman',
	'Georgia',
	'Garamond',
	'Courier New',
	'Brush Script MT',
];

interface IProps {
	onChange: (value: Partial<ICanvasElement>) => void;
	fontFamily: string;
}

export default function EditFontFamily({ fontFamily, onChange }: IProps) {
	const [value, setValue] = useState<string>(fontFamily);

	useEffect(() => {
		const font = value;
		console.log('font',font)
		onChange({ fontFamily: font });
	}, [value]);

	return (
		<div className='flex w-full max-w-xs flex-col gap-2'>
			<Select
				label='Font'
				// variant='flat'
				placeholder='Select an animal'
				radius='none'
				selectedKeys={[value]}
				className='max-w-xs'
				onChange={(e) => setValue(e.target.value)}
				size='sm'
				classNames={{
					trigger: 'bg-transparent/10 data-[hover=true]:bg-transparent/15 rounded-lg',
					helperWrapper: 'hover:bg-secondary',
					label: 'text-md text-black',
					// base: 'rounded-xl'
				}}
			>
				{fonts.map((font) => (
					<SelectItem key={font}>{font}</SelectItem>
				))}
			</Select>
		</div>
	);
}
