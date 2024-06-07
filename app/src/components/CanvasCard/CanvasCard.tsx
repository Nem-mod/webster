import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import PreviewCanvasStage from '../PreviewCanvas/PreviewCanvasStage/PreviewCanvasStage';
import { ICanvas } from '../../redux/slices/canvases/canvases-slice.types';

interface IProps {
	canvas: ICanvas;
	to: string;
}

export default function CanvasCard({ canvas, to }: IProps) {
	return (
		<Link to={to}>
			<Card className='py-4 bg-secondary/30 hover:bg-light shadow-xl'>
				<CardBody className='overflow-visible py-2'>
					{canvas.canvas && (
						<div className={'bg-white rounded'}>
							<PreviewCanvasStage
								canvas={canvas}
								scaleParam={8}
								shapes={canvas.canvas.elements || []}
							/>
						</div>
					)}
				</CardBody>
				<CardHeader className='pb-0 pt-2 px-10 flex-col items-start'>
					<p className='text-tiny uppercase font-bold'>{canvas.canvasName}</p>
					{/*<p className='text-tiny'>01.06.2024</p>*/}
				</CardHeader>
			</Card>
		</Link>
	);
}
