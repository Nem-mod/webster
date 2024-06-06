import { Layer, Stage } from 'react-konva';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import HistoryCanvasElement from './HistoryCanvasElement/HistoryCanvasElement';
import { reviewByIndex } from '../../redux/slices/canvasSlice/canvas-slice';

export default function HistoryList() {
	const dispatch = useAppDispatch();
	const canvas = useAppSelector((state) => state.canvas.data);
	if (!canvas) return <></>;

	const history = canvas?.history;
	const scaleParm = 8;
	const divWidth = canvas.resolution[0] / scaleParm;
	const divHeight = canvas.resolution[1] / scaleParm;

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
									<Stage
										width={canvas.resolution[0] / scaleParm}
										height={canvas.resolution[1] / scaleParm}
										x={0}
										y={0}
										scaleX={1 / scaleParm}
										scaleY={1 / scaleParm}
									>
										<Layer>
											{shapes?.map((shape, index) => {
												shape = {
													...shape,
													id: `${shape.type}-${index}`,
												};

												return (
													<HistoryCanvasElement
														key={index}
														shape={shape}
														index={index}
													/>
												);
											})}
										</Layer>
									</Stage>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}
