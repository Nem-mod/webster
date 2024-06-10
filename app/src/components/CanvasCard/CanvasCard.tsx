import {Card, CardHeader, CardBody, Image, Button, useDisclosure} from '@nextui-org/react';
import { Link } from 'react-router-dom';
import PreviewCanvasStage from '../PreviewCanvas/PreviewCanvasStage/PreviewCanvasStage';
import { ICanvas } from '../../redux/slices/canvases/canvases-slice.types';
import { useEffect, useRef, useState } from 'react';
import DeleteCanvasModal from "../DeleteCanvasModal/DeleteCanvasModal.tsx";
import CreateEditCanvasModal from "../CreateEditCanvasModal/CreateEditCanvasModal.tsx";

interface IProps {
	canvas: ICanvas;
	to: string;
}

export default function CanvasCard({ canvas, to }: IProps) {
	const [isPopoverActive, setIsPopoverActive] = useState<boolean>(false);
	const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenDeleteChange } = useDisclosure()
	const { isOpen: isOpenEdit, onOpen: onOpenEdit, onOpenChange: onOpenEditChange } = useDisclosure()
	const ref = useRef();

	// useEffect(() => {
	// 	const handleClickOutside = (event) => {
	// 		if (ref.current && !ref.current.contains(event.target)) {
	// 			setIsPopoverActive(false);
	// 		}
	// 	};
	// 	document.addEventListener('click', handleClickOutside, true);
	// 	return () => {
	// 		document.removeEventListener('click', handleClickOutside, true);
	// 	};
	// }, []);

	const handleOpenPopover = (e: React.MouseEvent<HTMLElement> | null) => {
		e?.preventDefault();
		setIsPopoverActive(true);
	};

	const handleClosePopover = (e: React.MouseEvent<HTMLElement> | null) => {
		e?.preventDefault()
		setIsPopoverActive(false);
	};

	const handleCloseDeleteModal = () => {
		handleClosePopover(null)
		onOpenDeleteChange()
	}

	// TODO: canvas card aspect ratio
	return (
		<Card
			ref={ref}
			onContextMenu={handleOpenPopover}
			className='py-4 bg-secondary/30 shadow-xl relative overflow-visible'
			onMouseLeave={handleClosePopover}
		>
			<CardBody className='overflow-visible py-2 hover:bg-light flex items-center'>
				<Link to={to}>
					{canvas.canvas && (
						<div className={`bg-white rounded`} style={{width: `${canvas.resolution[0]}px`, height: `${canvas.resolution[1]}px`}}>
							<PreviewCanvasStage
								canvas={canvas}
								scaleParam={1}
								shapes={canvas.canvas.elements || []}
							/>
						</div>
					)}
				</Link>
			</CardBody>

			<CardHeader className='pb-0 pt-2 px-10 flex-col items-start'>
				<p className='text-tiny uppercase font-bold'>{canvas.canvasName}</p>
				{/*<p className='text-tiny'>01.06.2024</p>*/}
			</CardHeader>
			{isPopoverActive && (
				<div
					className={
						'absolute right-[-50px] bottom-[-50px] rounded overflow-visible z-40'
					}
				>
					<div
						className='overflow-visible py-2 rounded flex flex-col bg-light'
						gap-2
					>
						<Button className={'hover:bg-accent-light bg-transparent rounded-none'} onPress={onOpenEditChange}>Edit</Button>
						<Button className={'hover:bg-accent-light bg-transparent rounded-none'} onPress={onOpenDeleteChange}>Delete</Button>
					</div>
				</div>
			)}
			<DeleteCanvasModal canvasId={canvas._id} isOpen={isOpenDelete} onOpenChange={() => { handleClosePopover(null); onOpenDeleteChange() }}/>
			<CreateEditCanvasModal canvas={canvas} isOpen={isOpenEdit} onOpenChange={() => { handleClosePopover(null); onOpenEditChange() }}/>
		</Card>
	);
}
