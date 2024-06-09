import { Card, CardHeader, CardBody, Image, Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import PreviewCanvasStage from '../PreviewCanvas/PreviewCanvasStage/PreviewCanvasStage';
import { ICanvas } from '../../redux/slices/canvases/canvases-slice.types';
import { useEffect, useRef, useState } from 'react';

interface IProps {
	canvas: ICanvas;
	to: string;
}

export default function CanvasCard({ canvas, to }: IProps) {
	const [isPopoverActive, setIsPopoverActive] = useState<boolean>(false);
	const ref = useRef();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setIsPopoverActive(false);
			}
		};
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);

	const handleOpenPopover = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		setIsPopoverActive(true);
	};

	return (
		<Card
			ref={ref}
			onContextMenu={handleOpenPopover}
			className='py-4 bg-secondary/30 shadow-xl relative overflow-visible'
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
						<div className={'px-5 hover:bg-accent-light'}>Edit</div>
						<div className={'px-5 hover:bg-accent-light'}>Delete</div>
					</div>
				</div>
			)}
		</Card>
	);
}
