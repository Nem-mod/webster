import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Layer, Stage, Star, Text } from 'react-konva';
function generateShapes() {
	return [...Array(10)].map((_, i) => ({
		id: i.toString(),
		x: Math.random() * window.innerWidth,
		y: Math.random() * window.innerHeight,
		rotation: Math.random() * 180,
		isDragging: false,
	}));
}

const INITIAL_STATE = generateShapes();

function App() {
	const [stars, setStars] = useState(INITIAL_STATE);
	const divRef = useRef<HTMLInputElement>(null);
	const [dimensions, setDimensions] = useState({
		width: 0,
		height: 0,
	});
	const [stageScale, setStageScale] = useState({
		scale: 1,
		stageX: 0,
		stageY: 0,
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
	}, []);

	const handleDragStart = (e) => {
		const id = e.target.id();
		setStars(
			stars.map((star) => {
				return {
					...star,
					isDragging: star.id === id,
				};
			})
		);
	};
	const handleDragEnd = (e) => {
		setStars(
			stars.map((star) => {
				return {
					...star,
					isDragging: false,
				};
			})
		);
	};

	const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
		e.evt.preventDefault();

		if (!e.target) return;

		if (e.evt.ctrlKey) {
			const scaleBy = 1.1;
			const stage = e.target.getStage();

			if (!stage) return;

			const oldScale = stage.scaleX();
			const mousePointTo = {
				x: stage.getPointerPosition()?.x / oldScale - stage.x() / oldScale,
				y: stage.getPointerPosition()?.y / oldScale - stage.y() / oldScale,
			};
			console.log('(stage.getPointerPosition()', stage.getPointerPosition());
			const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
			setStageScale(() => {
				return {
					scale: newScale,
					stageX: (stage.getPointerPosition().x / newScale - mousePointTo.x) * newScale,
					stageY: (stage.getPointerPosition().y / newScale - mousePointTo.y) * newScale,
				};
			});
			return;
		}
	};
	console.log('stageScale', stageScale);
	return (
		<div className={'border-1 border-blue-500'}>
			<div className={'w-3/4 h-screen border-1 bg-black'} ref={divRef}>
				<Stage
					onWheel={handleWheel}
					scaleX={stageScale.scale}
					scaleY={stageScale.scale}
					x={stageScale.stageX}
					y={stageScale.stageY}
					width={dimensions.width}
					height={dimensions.height}
					draggable
				>
					<Layer>
						<Text text='Try to drag a star' />
						{stars.map((star) => (
							<Star
								key={star.id}
								id={star.id}
								x={star.x}
								y={star.y}
								numPoints={5}
								innerRadius={20}
								outerRadius={40}
								fill='#89b717'
								opacity={0.8}
								draggable
								rotation={star.rotation}
								shadowColor='black'
								shadowBlur={10}
								shadowOpacity={0.6}
								shadowOffsetX={star.isDragging ? 10 : 5}
								shadowOffsetY={star.isDragging ? 10 : 5}
								scaleX={star.isDragging ? 1.2 : 1}
								scaleY={star.isDragging ? 1.2 : 1}
								onDragStart={handleDragStart}
								onDragEnd={handleDragEnd}
							/>
						))}
					</Layer>
				</Stage>
			</div>
		</div>
	);
}

export default App;
