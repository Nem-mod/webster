import { Image } from 'react-konva';
import { useImage } from 'react-konva-utils';
import { ICanvasElement } from '../../services/canvas/canvas.types';
import Konva from 'konva';
import { useEffect, useRef } from 'react';
interface IProps {
	shape: ICanvasElement;
	index?: number;
	onChange?: (index: number, element: Partial<ICanvasElement>) => void;
}
export default function ImageElement({
	shape: { src, filters, ref: imageRef, ...shapeProps },
}: IProps) {
	// FIXME: Image do not loads with anonymous flag
	const [image, status] = useImage(src, 'anonymous'); // 'anonymous'
	const konvaFilters =
		filters && filters?.map((filter) => Konva.Filters[filter]) || [];
	// when image is loaded we need to cache the shape
	useEffect(() => {
		if (image) {
			// you many need to reapply cache on some props changes like shadow, stroke, etc.
			imageRef?.current?.cache();
		}
	}, [image, konvaFilters]);

	return (
		<>
			{image && (
				<Image
					ref={imageRef}
					image={image}
					filters={konvaFilters}
					{...shapeProps}
				/>
			)}
		</>
	);
}
