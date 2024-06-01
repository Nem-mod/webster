import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';

interface IProps {
	canvasName: string;
	to: string;
}

export default function CanvasCard({ canvasName, to }: IProps) {
	return (
		<Link to={to}>
			<Card className='py-4 bg-secondary/30 hover:bg-light shadow-xl'>
				<CardBody className='overflow-visible py-2'>
					<Image
						alt='Card background'
						className='object-cover rounded-xl'
						src='https://nextui.org/images/hero-card-complete.jpeg'
						width={270}
					/>
				</CardBody>
				<CardHeader className='pb-0 pt-2 px-10 flex-col items-start'>
					<p className='text-tiny uppercase font-bold'>{canvasName}</p>
					{/*<p className='text-tiny'>01.06.2024</p>*/}
				</CardHeader>
			</Card>
		</Link>
	);
}
