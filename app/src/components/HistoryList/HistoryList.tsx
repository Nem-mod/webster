import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { reviewByIndex } from '../../redux/slices/canvasSlice/canvas-slice';
import PreviewCanvasStage from '../PreviewCanvas/PreviewCanvasStage/PreviewCanvasStage';

export default function HistoryList() {
	const dispatch = useAppDispatch();
	const canvas = useAppSelector((state) => state.canvas.data);
	if (!canvas) return <></>;

	const history = canvas?.history;
	const scaleParam = 8;
	const divWidth = canvas.resolution[0] / scaleParam;
	const divHeight = canvas.resolution[1] / scaleParam;

	const handleClick = (index: number) => {
		dispatch(reviewByIndex({ index: index }));
	};

	return (
		<div>
			<div className={'flex flex-col-reverse gap-2 px-4'}>
				{history?.stack &&
					history.stack.map((shapes, index) => {
						return (
							<div key={index}>
								{history.currentPos === index && <div className={'font-bold my-2'}> Current </div>}
								<div
									className={`bg-white rounded `}
									onClick={() => handleClick(index)}
									style={{
										width: divWidth,
										height: divHeight,
									}}
								>
									<PreviewCanvasStage canvas={canvas} scaleParam={scaleParam} shapes={shapes}/>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}
