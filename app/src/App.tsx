import { useEffect, useRef, useState } from 'react';
import CanvasMenu from './components/canvas-actions/CanvasMenu/CanvasMenu';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchCanvasById } from './redux/slices/canvasSlice/canvas-slice.service';
import { RootState } from './redux/store';
import { CanvasStage } from './components/CanvasStage/CanvasStage';

function App() {
	const dispatch = useAppDispatch();

	const divRef = useRef<HTMLInputElement>(null);
	const [dimensions, setDimensions] = useState({
		width: 0,
		height: 0,
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

		dispatch(fetchCanvasById(0));
	}, []);

	const canvas = useAppSelector((state: RootState) => state.canvas.data);

	return (
		<div className={'flex border-1 border-blue-500'}>
			<div className={'w-3/4 h-screen border-1 bg-black'} ref={divRef}>
				{canvas && <CanvasStage canvas={canvas} dimensions={dimensions} />}
			</div>
			<div className={'pl-20'}>
				<CanvasMenu />
			</div>
		</div>
	);
}

export default App;
