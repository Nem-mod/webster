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
	const [maxScale, setMaxScale] = useState(8);
	const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenDeleteChange } = useDisclosure()
	const { isOpen: isOpenEdit, onOpen: onOpenEdit, onOpenChange: onOpenEditChange } = useDisclosure()
	const ref = useRef();
	const cardBodyRef = useRef<HTMLElement>();
	const canvasBgRef = useRef<HTMLElement>()

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

	useEffect(() => {
			const cardBounds = cardBodyRef.current.getBoundingClientRect();
			const xScale = canvas.resolution[0] / cardBounds.width;
			const yScale = canvas.resolution[1] / cardBounds.height;
			const localMaxScale = Math.max(xScale, yScale)
			setMaxScale(localMaxScale)

			console.log(canvas.resolution[0] * localMaxScale)

			canvasBgRef.current.style.width = `${canvas.resolution[0] / localMaxScale}px`;
			canvasBgRef.current.style.height = `${canvas.resolution[1] / localMaxScale}px`;

	}, [canvas, cardBodyRef, canvasBgRef, maxScale]);

	return (
		<Card
			ref={ref}
			onContextMenu={handleOpenPopover}
			className='py-4 bg-secondary/30 shadow-xl relative overflow-visible min-w-[300px] max-w-[300px] min-h-[400px] max-h-[400px] flex justify-center items-center hover:bg-light'
			onMouseLeave={handleClosePopover}
		>
			<CardBody className='py-2 w-[90%] h-[50%]' ref={cardBodyRef}>
				<Link to={to} className={'w-full h-full flex justify-center items-center'}>
					{canvas.canvas && (
						<div className={'bg-white rounded'} ref={canvasBgRef} style={{width: `${canvas.resolution[0] / 8}px`, height: `${canvas.resolution[1] / 8}px`}}>
							<PreviewCanvasStage
								canvas={canvas}
								scaleParam={maxScale}
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
