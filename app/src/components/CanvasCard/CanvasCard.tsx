import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';

interface IProps {
	canvasName: string;
}

export default function CanvasCard({ canvasName }: IProps) {
	return (
		<Link to={'#'}>
			<Card className='py-4'>
				<CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
					<p className='text-tiny uppercase font-bold'>{canvasName}</p>
				</CardHeader>
				<CardBody className='overflow-visible py-2'>
					<Image
						alt='Card background'
						className='object-cover rounded-xl'
						src='https://nextui.org/images/hero-card-complete.jpeg'
						width={270}
					/>
				</CardBody>
			</Card>
		</Link>
	);
}
