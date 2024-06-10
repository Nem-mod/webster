import {Button, Input, useDisclosure} from '@nextui-org/react';
import { SearchIcon } from '../../components/Icons/SearchIcon';
import CanvasCard from '../../components/CanvasCard/CanvasCard';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {useEffect} from 'react';
import { fetchCanvases } from '../../redux/slices/canvases/canvases-slice.service';
import {CustomNavBar} from "../../components/NavBar/CustomNavBar.tsx";
import CreateEditCanvasModal from "../../components/CreateEditCanvasModal/CreateEditCanvasModal.tsx";

export default function HomePage() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const dispatch = useAppDispatch();
	const canvases = useAppSelector((state) => state.canvases.data?.canvases);
	useEffect(() => {
		dispatch(fetchCanvases(null));
	}, []);


	return (
		<div className={'flex flex-col h-screen'}>
			<CustomNavBar/>
			<div className={`flex justify-center grow w-screen bg-gradient-to-bl from-accent/20 to-light/20`}>
				<div className='pt-20 max-w-6xl'>
						<div className={'flex gap-10'}>
							<Input
								classNames={{
									base: 'w-full h-10',
									mainWrapper: 'h-full',
									input: 'text-large',
									inputWrapper:
										'h-full font-normal text-default-500 bg-accent/50 dark:bg-accent/20'
								}}
								placeholder='Type to search...'
								size='lg'
								startContent={<SearchIcon size={18} />}
								type='search'
							/>
							<Button
								className={'text-xl bg-primary/90'}
								size={'lg'}
								color={'primary'}
								onPress={onOpen}
							>
								Create new
							</Button>
							<CreateEditCanvasModal isOpen={isOpen} onOpenChange={onOpenChange}/>
						</div>
						<div className={'flex mt-10 gap-10 flex-wrap justify-center'}>
							{canvases &&
								canvases.map((canvas) => (
									<CanvasCard
										key={canvas._id}
										canvas={canvas}
										to={`/workspace/${canvas._id}`}
									/>
								))}
						</div>
				</div>
			</div>
		</div>
	);
}
