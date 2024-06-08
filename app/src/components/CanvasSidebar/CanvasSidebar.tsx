import {Tabs, Tab, ScrollShadow, Button} from '@nextui-org/react';
import { useState } from 'react';
import CanvasMenu from '../CanvasMenuGroup/CanvasMenu/CanvasMenu.tsx';
import HistoryList from '../HistoryList/HistoryList.tsx';
import { Image } from "@nextui-org/react"

const icons = {
	minmize: '../../../../public/minimize_icon.png'
}

export const CanvasSidebar = () => {
	const [selected, setSelected] = useState(null);

	const unselectTab = () => {
		setSelected(null);
	};

	return (
		<div className={'flex flex-row justify-center h-[calc(100vh_-_64px)]'}>
			{selected !== 'null' &&
				<div className={'absolute left-0 ml-[4.7rem]'}>
					<Button isIconOnly className={'bg-secondary/70 rounded-r-none rounded-t-none'} size={'sm'} onClick={unselectTab}>
						<Image src={icons.minmize} width={20} height={20} radius={'none'} />
					</Button>
				</div>}
			<Tabs
				selectedKey={selected}
				onSelectionChange={setSelected}
				isVertical
				classNames={{
					tabList: 'rounded-none bg-transparent m-2',
					tab: 'text-white-500',
					base: 'items-center border-r-1 border-primary/20',
					wrapper: 'max-w-inherit',
					panel: 'flex  justify-center m-2 overflow-auto max-h-full',
				}}
			>
				<Tab key={'null'} title={'Null'} className={'hidden'}></Tab>
				<Tab key={'tools'} title={'Tools'}>
					<div className={'flex flex-col'}>
						{/*<Button isIconOnly className={'bg-secondary/70'} size={'sm'}>*/}
						{/*	X*/}
						{/*</Button>*/}
						{/*<span className={'ml-auto  rounded-xl rounded-r-none rounded-t-none aspect-square text-center'} onClick={unselectTab}>*/}
						{/*	X*/}
						{/*</span>*/}
						<CanvasMenu />
					</div>
				</Tab>
				<Tab key={'images'} title={'Images'}>

					<div className='max-w-inherit'></div>
				</Tab>
				<Tab key={'history'} title={'History'}>
					<ScrollShadow >
						<HistoryList />
					</ScrollShadow>
				</Tab>
				<Tab key={'shortcuts'} title={'Shortcuts'}>
					<div className='max-w-inherit'>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
						<p>a</p>
					</div>
				</Tab>
			</Tabs>
		</div>
	);
};
