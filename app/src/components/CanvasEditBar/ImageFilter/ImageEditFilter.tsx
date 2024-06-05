import { Select, SelectItem, Slider } from '@nextui-org/react';
import { ICanvasElement } from '../../../services/canvas/canvas.types';
import Konva from 'konva';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { updateElement } from '../../../redux/slices/canvasSlice/canvas-slice';

interface IProps {
	elements: ICanvasElement[];
}

const filterHasAttrs = {
	Blur: {
		key: 'blurRadius',
		value: 0,
		maxValue: 100,
		minValue: 0,
	},
	Brighten: {
		key: 'brightness',
		value: 0,
		maxValue: 1,
		minValue: -1,
		step: 0.02,
	},
	Contrast: {
		key: 'contrast',
		value: 0,
		maxValue: 100,
		minValue: -100,
		step: 1,
	},
	Enhance: {
		key: 'enhance',
		value: 0,
		maxValue: 1,
		minValue: -1,
		step: 0.01,
	},
	Noise: {
		key: 'noise',
		value: 0,
		maxValue: 4,
		minValue: 0,
		step: 0.1,
	}
};

interface IFilterObject {
	name: string;
	attrs: {
		key: string;
		value: number;
		maxValue: number;
		minValue: number;
		step: number;
	} | null;
}

const filters = Object.keys(Konva.Filters).filter(e => {
	return !["HSL", "HSV", "RGB", "RGBA", "Mask", "Posterize", "Threshold"].includes(e)
}).map((filterName) => {
	// if (filterName === 'Emboss') return;
	const filterObject: IFilterObject = {
		name: filterName,
		attrs: filterHasAttrs[filterName] || null,
	};

	return filterObject;
});

function FilterValueSlider({
	data,
	onChange,
}: {
	data: IFilterObject;
	onChange: (args?: object) => void;
}) {
	const [value, setValue] = useState<number | number[]>(data.attrs?.value || 0);
	useEffect(() => {
		if (!data.attrs) return;

		onChange({ [data.attrs.key]: value });
	}, [value]);
	return (
		<Slider
			step={data.attrs?.step || 0.5}
			maxValue={data.attrs?.maxValue || 100}
			minValue={data.attrs?.minValue || 1}
			size={'sm'}
			value={value}
			onChange={setValue}
			// onChangeEnd={handleChangeOpacity}
		/>
	);
}

export default function ImageEditFilter({ elements }: IProps) {
	const dispatch = useAppDispatch();
	const elementsFilters = elements.reduce((flattenedArray, curr) => {
		if (!curr.filters) return flattenedArray;
		return flattenedArray.concat(curr?.filters);
	}, []);

	const [value, setValue] = useState<Selection>(new Set(elementsFilters));

	const handleChangeFilter = (args?: object) => {
		const filters = [...value];

		elements.forEach((element) => {
			dispatch(
				updateElement({
					index: element.index,
					element: { ...element, filters: filters, ...args },
				})
			);
		});
	};

	useEffect(() => {
		handleChangeFilter();
	}, [value]);

	return (
		<Select
			label='Filters'
			selectionMode='multiple'
			selectedKeys={value}
			onSelectionChange={setValue}
			className='max-w-xs'
		>
			{filters.map((filter) => (
				<SelectItem key={filter.name}>
					<span>{filter.name}</span>
					{filter.attrs && (
						<FilterValueSlider data={filter} onChange={handleChangeFilter} />
					)}
				</SelectItem>
			))}
		</Select>
	);
}
