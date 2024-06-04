import {
	Select,
	SelectItem,
} from '@nextui-org/react';
import { ICanvasElement } from '../../../services/canvas/canvas.types';
import Konva from 'konva';

interface IProps {
	elements: ICanvasElement[];
}

const filters = Object.entries(Konva.Filters);

export default function ImageEditFilter({ elements }: IProps) {
	return (
		<Select
		label="Filters"
		selectionMode="multiple"
		className="max-w-xs"
	>
		{filters.map((filter) => (
			<SelectItem key={filter[0]}>
				{filter[0]}
			</SelectItem>
		))}
	</Select>
	);
}
