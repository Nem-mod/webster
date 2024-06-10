import { useEffect, useRef, useState } from 'react';
import CanvasMenu from '../../components/CanvasMenuGroup/CanvasMenu/CanvasMenu';
import { CanvasStage } from '../../components/CanvasStage/CanvasStage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCanvasById } from '../../redux/slices/canvasSlice/canvas-slice.service';
import { RootState } from '../../redux/store';
import { useParams } from 'react-router-dom';
import axios from '../../axios/instance';
import CanvasEditBar from '../../components/CanvasEditBar/CanvasEditBar.tsx';
import { CanvasSidebar } from '../../components/CanvasSidebar/CanvasSidebar.tsx';
import { CustomNavBar } from '../../components/NavBar/CustomNavBar.tsx';
import { EStateStatus } from '../../constants/stateStatus.enum.ts';

export default function CanvasPage() {
	const border = false;

	const dispatch = useAppDispatch();
	const { id: canvasId } = useParams();
	const divRef = useRef<HTMLInputElement>(null);
	const stageRef = useRef<any>();
	const stageWrapperRef = useRef<any>(null);
	const [dimensions, setDimensions] = useState({
		width: 1000,
		height: 1000,
	});

	// We cant set the h & w on Stage to 100% it only takes px values so we have to
	// find the parent container's w and h and then manually set those !
	useEffect(() => {
		if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
			setDimensions({
				width: divRef.current.offsetWidth,
				height: divRef.current.offsetHeight,
			});
		}
		if (!canvasId) dispatch(fetchCanvasById('0'));
		if (canvasId) dispatch(fetchCanvasById(canvasId));
	}, []);

	const canvas = useAppSelector((state: RootState) => state.canvas);
	return (
		<div className={'flex flex-col h-screen max-h-screen min-h-screen'}>
			<CustomNavBar />
			<div
				className={'w-screen max-w-full flex flex-row grow'}
			>
				<div className='h-full flex justify-center items-center bg-secondary/30'>
					<CanvasSidebar />
				</div>

				<div className={'flex flex-col grow overflow-hidden'}>
					{/* min-w-32 max-w-20 */}
					<div className={`overflow-hidden flex-none bg-secondary/30 `}>
						{/* TODO: if set absolute, then width problem. fix canvas dragging */}
						<CanvasEditBar stageRef={stageRef} />
					</div>

					<div
						className={`grow flex justify-center items-center bg-gray-400/20 pt-10`}
						ref={stageWrapperRef}
					>
						{canvas.data && (
							<CanvasStage
								canvasState={canvas}
								dimensions={dimensions}
								stageRef={stageRef}
								stageWrapperRef={stageWrapperRef}
							/>
						)}
					</div>
				</div>
			</div>
			{/*<div className={'flex border-1 border-blue-500'}>*/}
			{/*	<div className={'grow'}>*/}
			{/*		{canvas.data && (*/}
			{/*			<CanvasStage canvasState={canvas} dimensions={dimensions} />*/}
			{/*		)}*/}
			{/*	</div>*/}
			{/*	<div className={'pl-20'}>*/}
			{/*		<CanvasMenu />*/}
			{/*	</div>*/}
			{/*</div>*/}
			{/*<InputImageFile />*/}
		</div>
	);
}
