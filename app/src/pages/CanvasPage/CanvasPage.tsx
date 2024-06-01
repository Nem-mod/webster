import { useEffect, useRef, useState } from 'react';
import CanvasMenu from '../../components/CanvasMenuGroup/CanvasMenu/CanvasMenu';
import { CanvasStage } from '../../components/CanvasStage/CanvasStage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCanvasById } from '../../redux/slices/canvasSlice/canvas-slice.service';
import { RootState } from '../../redux/store';
import InputImageFile from '../../components/InputImageFile/InputImageFile';
import { useParams } from 'react-router-dom';
import axios from '../../axios/instance';

export default function CanvasPage() {
	const dispatch = useAppDispatch();
	const { id: canvasId } = useParams();
	const divRef = useRef<HTMLInputElement>(null);
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
		<div>
			<div className={'flex border-1 border-blue-500'}>
				<div className={'grow'}>
					{canvas.data && (
						<CanvasStage canvasState={canvas} dimensions={dimensions} />
					)}
				</div>
				<div className={'pl-20'}>
					<CanvasMenu />
				</div>
			</div>
			<InputImageFile />
		</div>
	);
}
