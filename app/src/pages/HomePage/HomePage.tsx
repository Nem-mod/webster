import { Button, Input } from '@nextui-org/react';
import { SearchIcon } from '../../components/Icons/SearchIcon';
import CanvasCard from '../../components/CanvasCard/CanvasCard';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useEffect } from 'react';
import { fetchCanvases } from '../../redux/slices/canvases/canvases-slice.service';
import CreateCanvasModal from '../../components/CreateCanvasModal/CreateCanvasModal';

export default function HomePage() {
	const dispatch = useAppDispatch();
	const canvases = useAppSelector((state) => state.canvases.data?.canvases);
	useEffect(() => {
		dispatch(fetchCanvases(null));
	}, []);

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
					<CreateCanvasModal />
				</div>
				<div className={'flex mt-10 gap-10'}>
					{canvases &&
						canvases.map((canvas) => (
							<CanvasCard
								key={canvas._id}
								canvasName={canvas.canvasName}
								to={`/workspace/${canvas._id}`}
							/>
						))}
				</div>
			</div>
		</div>
	);
}
