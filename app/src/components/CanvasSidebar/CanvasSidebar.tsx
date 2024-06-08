import { Tabs, Tab, ScrollShadow } from '@nextui-org/react';
import { useState } from 'react';
import CanvasMenu from '../CanvasMenuGroup/CanvasMenu/CanvasMenu.tsx';
import HistoryList from '../HistoryList/HistoryList.tsx';

export const CanvasSidebar = () => {
	const [selected, setSelected] = useState(null);

	const unselectTab = () => {
		setSelected(null);
	};

	return (
		<div className={'flex flex-row justify-center h-[calc(100vh_-_64px)]'}>
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
						<span className={'ml-auto'} onClick={unselectTab}>
							X
						</span>
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
