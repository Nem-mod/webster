import { Button, Input, Spacer } from '@nextui-org/react';
import { SearchIcon } from '../../components/Icons/SearchIcon';
import CanvasCard from '../../components/CanvasCard/CanvasCard';

const canvases = [
	{
		canvasName: 'title1',
	},
	{
		canvasName: 'title2',
	},
];

export default function HomePage() {
	return (
		<div className='pt-20 max-w-6xl m-auto'>
			<div>
				<div className={'flex gap-10'}>
					<Input
						classNames={{
							base: 'w-full h-10',
							mainWrapper: 'h-full',
							input: 'text-large',
							inputWrapper:
								'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
						}}
						placeholder='Type to search...'
						size='lg'
						startContent={<SearchIcon size={18} />}
						type='search'
					/>
					<Button className={'text-xl'} size={'lg'} color={'primary'}>Create new canvas</Button>
				</div>
				<div className={'flex mt-10 gap-10'}>
					{canvases &&
						canvases.map((canvas) => (
							<CanvasCard canvasName={canvas.canvasName} to={`/workspace/${canvas.canvasName}`} />
						))}
				</div>
			</div>
		</div>
	);
}
