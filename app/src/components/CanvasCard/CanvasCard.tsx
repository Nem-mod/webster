import {Card, CardHeader, CardBody, Image, Button, useDisclosure} from '@nextui-org/react';
import { Link } from 'react-router-dom';
import PreviewCanvasStage from '../PreviewCanvas/PreviewCanvasStage/PreviewCanvasStage';
import { ICanvas } from '../../redux/slices/canvases/canvases-slice.types';
import { useEffect, useRef, useState } from 'react';
import DeleteCanvasModal from "../DeleteCanvasModal/DeleteCanvasModal.tsx";

interface IProps {
	canvas: ICanvas;
	to: string;
}

export default function CanvasCard({ canvas, to }: IProps) {
	const [isPopoverActive, setIsPopoverActive] = useState<boolean>(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
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

	const handleOpenPopover = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		setIsPopoverActive(true);
	};

	const handleClosePopover = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()
		setIsPopoverActive(false);
	};

	return (
		<Card
			ref={ref}
			onContextMenu={handleOpenPopover}
			className='py-4 bg-secondary/30 shadow-xl relative overflow-visible'
			onMouseLeave={handleClosePopover}
		>
			<CardBody className='overflow-visible py-2 hover:bg-light'>
				<Link to={to}>
					{canvas.canvas && (
						<div className={'bg-white rounded'}>
							<PreviewCanvasStage
								canvas={canvas}
								scaleParam={8}
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
						<Button className={'hover:bg-accent-light bg-transparent rounded-none'}>Edit</Button>
						<Button className={'hover:bg-accent-light bg-transparent rounded-none'} onPress={onOpen}>Delete</Button>
					</div>
				</div>
			)}
			<DeleteCanvasModal canvasId={canvas._id} isOpen={isOpen} onOpenChange={onOpenChange}/>
		</Card>
	);
}
