import { Select, SelectItem } from '@nextui-org/react';
import { ICanvasElement } from '../../../services/canvas/canvas.types';
import Konva from 'konva';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { updateElement } from '../../../redux/slices/canvasSlice/canvas-slice';

interface IProps {
	elements: ICanvasElement[];
}

const filters = Object.entries(Konva.Filters);

export default function ImageEditFilter({ elements }: IProps) {
	const dispatch = useAppDispatch();
	const elementsFilters = elements.reduce((flattenedArray, curr) => {
		console.log('curr', curr);
		if (!curr.filters) return flattenedArray;

		return flattenedArray.concat(curr?.filters);
	}, []);
	
	const [value, setValue] = useState<Selection>(new Set(elementsFilters));
	useEffect(() => {
		const filters = [...value];
		console.log('filters', filters);

		elements.forEach((element) => {
			dispatch(
				updateElement({
					index: element.index,
					element: { ...element, filters: filters },
				})
			);
		});
	}, [value]);

	// const handleChangeFilter = () => {
	// 	elements.forEach((element) => {
	// 		dispatch(updateElement({ ...element ,
	// 			filters: [...value].map(filter =>
	// 				{
	// 					console.log('filter',filter)
	// 				}
	// 			)
	// 		}));
	// 	});
	// };

	return (
		<Select
			label='Filters'
			selectionMode='multiple'
			selectedKeys={value}
			onSelectionChange={setValue}
			className='max-w-xs'
		>
			{filters.map((filter) => (
				<SelectItem key={filter[0]}>{filter[0]}</SelectItem>
			))}
		</Select>
	);
}
