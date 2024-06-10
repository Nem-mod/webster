import { useEffect, useRef, useState } from 'react';
import { CanvasStage } from '../../components/CanvasStage/CanvasStage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCanvasById } from '../../redux/slices/canvasSlice/canvas-slice.service';
import { RootState } from '../../redux/store';
import { useParams } from 'react-router-dom';
import CanvasEditBar from '../../components/CanvasEditBar/CanvasEditBar.tsx';
import { CanvasSidebar } from '../../components/CanvasSidebar/CanvasSidebar.tsx';
import { CustomNavBar } from '../../components/NavBar/CustomNavBar.tsx';

export default function CanvasPage() {
	const border = false;

	const dispatch = useAppDispatch();
	const { id: canvasId } = useParams();
	const divRef = useRef<HTMLInputElement>(null);
	const stageRef = useRef<any>();
	const stageWrapperRef = useRef<any>(null);
	const canvas = useAppSelector((state: RootState) => state.canvas);
	const [dimensions, setDimensions] = useState({
		width: 1000,
		height: 1000,
	});

	// We cant set the h & w on Stage to 100% it only takes px values so we have to
	// find the parent container's w and h and then manually set those !
	useEffect(() => {
		if (!canvasId) {
			dispatch(fetchCanvasById('0'));
		} else {
			dispatch(fetchCanvasById(canvasId));
		}
	}, [canvasId, dispatch]);

	useEffect(() => {
		const updateDimensions = () => {
			if (stageWrapperRef.current) {
				const { clientWidth, clientHeight } = stageWrapperRef.current;
				setDimensions({
					width: clientWidth,
					height: clientHeight,
				});
			}
		};

		updateDimensions(); // Update dimensions initially

		window.addEventListener('resize', updateDimensions);
		return () => {
			window.removeEventListener('resize', updateDimensions);
		};
	}, []);


	return (
		<div className={'flex flex-col h-screen max-h-screen min-h-screen overflow-hidden'}>
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
						{canvas?.data && (
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
