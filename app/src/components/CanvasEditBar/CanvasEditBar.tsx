import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateElement } from '../../redux/slices/canvasSlice/canvas-slice';
import { CanvasElementType } from '../../services/canvas/canvas-element-types.enum';
import { ICanvasElement } from '../../services/canvas/canvas.types';
import ImageEditFilter from './ImageFilter/ImageEditFilter';
import SaveCanvasMenu from './SaveCanvasMenu/SaveCanvasMenu';
import { ImageCrop } from './ImageCrop/ImageCrop';
import { EditLayer } from './EditLayer/EditLayer';
import { EditText } from './EditText/EditText';
import { EditOpacity } from './EditOpacity/EditOpacity';
import { EditColor } from './EditColor/EditColor';
import { EditPenColor } from './EditPenColor/EditPenColor';

interface IProps {
	stageRef: any; // LegacyRef<Konva.Stage>
}

export default function CanvasEditBar({ stageRef }: IProps) {
	const dispatch = useAppDispatch();
	const selectedElements = useAppSelector(
		(state) => state.canvas.data?.selected
	);

	const activeTool = useAppSelector((state) => state.canvas.data?.activeTool);

	// EDIT
	const elementsTypes = selectedElements?.map((e) => e.type);
	const handleUpdate = (value: Partial<ICanvasElement>) => {
		if (!selectedElements) return;
		selectedElements.forEach((e) => {
			dispatch(
				updateElement({
					index: e.index,
					element: {
						...value,
					},
				})
			);
		});
	};

	return (
		<>
			<div
				className={'flex flex-row px-4 gap-4 border border-black rounded-md'}
			>
				{selectedElements?.length > 0 && (
					<>
						<EditColor
							selectedElements={selectedElements}
							handleUpdate={handleUpdate}
						/>

						<EditLayer />

						<EditOpacity handleUpdate={handleUpdate} />

						{elementsTypes &&
							elementsTypes.includes(CanvasElementType.TEXT) && (
								<EditText
									selectedElements={selectedElements}
									handleUpdate={handleUpdate}
								/>
							)}

						{elementsTypes &&
							elementsTypes.includes(CanvasElementType.IMAGE) && (
								<>
									<ImageEditFilter
										elements={selectedElements.filter(
											(e) => e.type === CanvasElementType.IMAGE
										)}
									/>
								</>
							)}

						{elementsTypes &&
							selectedElements.length === 1 &&
							elementsTypes.includes(CanvasElementType.IMAGE) && (
								<ImageCrop
									selectedElements={selectedElements}
									handleUpdate={handleUpdate}
								/>
							)}
					</>
				)}
				{activeTool && <EditPenColor activeTool={activeTool} />}
				<SaveCanvasMenu stageRef={stageRef} />
			</div>
		</>
	);
}
