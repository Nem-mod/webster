import { useEffect, useRef, useState } from 'react';
import CanvasMenu from '../../components/CanvasMenuGroup/CanvasMenu/CanvasMenu';
import { CanvasStage } from '../../components/CanvasStage/CanvasStage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCanvasById } from '../../redux/slices/canvasSlice/canvas-slice.service';
import { RootState } from '../../redux/store';
import { useParams } from 'react-router-dom';
import axios from '../../axios/instance';
import CanvasEditBar from "../../components/CanvasEditBar/CanvasEditBar.tsx";
import { CanvasSidebar } from '../../components/CanvasSidebar/CanvasSidebar.tsx';
import {CustomNavBar} from "../../components/NavBar/CustomNavBar.tsx";

export default function CanvasPage() {
	const border = false

	const dispatch = useAppDispatch();
	const { id: canvasId } = useParams();
	const divRef = useRef<HTMLInputElement>(null);
	const stageRef = useRef<any>();
	const stageWrapperRef = useRef<any>(null)
	const [dimensions, setDimensions] = useState({
		width: 2000,
		height: 2000,
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

	// TODO: Refactor
	useEffect(() => {
		if (!canvas.data) return;
		axios
			.patch(`/canvas/${canvasId}`, {
				canvas: {
					elements: canvas.data.elements,
				},
			})
	}, [canvas.data?.elements]);

	return (
		<div className={'flex flex-col h-screen max-h-screen min-h-screen overflow-hidden border-accent-dark border-2'}>
			<CustomNavBar/>
			<div className={'w-screen max-w-full flex flex-row h-full border-accent-dark border-2'}>
				{/* <div className={`${border ? 'border-accent-dark border-2' : ''}`}>
					<p>tools</p>
					<p>images</p>
					<p>history</p>
				</div>

				<div className={`${border ? 'border-accent-dark border-2' : ''}`}>
					<CanvasMenu />
				</div> */}
				<div className='h-1/2'>
					<CanvasSidebar/>
				</div>

				<div className={`${border ? 'border-accent-dark border-2' : ''} grow flex justify-center items-center overflow-hidden`} ref={stageWrapperRef}>
					{canvas.data && (
						<CanvasStage canvasState={canvas} dimensions={dimensions} stageRef={stageRef} stageWrapperRef={stageWrapperRef} />
					)}
				</div>

				{/* min-w-32 max-w-20 */}
				<div className={`${border ? 'border-accent-dark border-2' : ''} w-64 overflow-hidden`}>
					<p>settings</p>
					<CanvasEditBar stageRef={stageRef} />
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
