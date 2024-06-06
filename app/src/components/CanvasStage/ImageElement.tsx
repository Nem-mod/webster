import { Image } from 'react-konva';
import { useImage } from 'react-konva-utils';
import { ICanvasElement } from '../../services/canvas/canvas.types';
import Konva from 'konva';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { updateElement } from '../../redux/slices/canvasSlice/canvas-slice';
interface IProps {
	shape: ICanvasElement;
	index: number;
	onChange?: (index: number, element: Partial<ICanvasElement>) => void;
}
export default function ImageElement({
	shape: { src, filters, ref: imageRef, ...shapeProps }, index
}: IProps) {
	// FIXME: Image do not loads with anonymous flag
	const dispatch = useAppDispatch();
	const [image, status] = useImage(src, 'anonymous'); // 'anonymous'
	const konvaFilters =
		filters && filters?.map((filter) => Konva.Filters[filter]) || [];
	// when image is loaded we need to cache the shape
	useEffect(() => {
		if (image) {
			// you many need to reapply cache on some props changes like shadow, stroke, etc.
			imageRef?.current?.cache();
			
			console.log('FIRST USE EFFECT', image)
		}
	}, [image, konvaFilters]);

	useEffect(() => {
		if (image) {
			setTimeout(() => dispatch(updateElement({
				index: index,
				element: {
					imageWidth: image.naturalWidth,
					imageHeight: image.naturalHeight
				}	
			})), 500)
			console.log('SECOND USE EFFECT', image)
		}
	}, [image])

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
