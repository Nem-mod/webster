import Konva from "konva";

type TStageScale = {
	scale: number
	stageX: number
	stageY: number
}

type TSetStageScale = React.Dispatch<React.SetStateAction<TStageScale>>

function borderCollision(newCoord: number, scale: number) {

	const leftBorder = 0
	const rightBorder = Math.round(-(scale - 1) * 1000)

	if (newCoord > leftBorder)
		return leftBorder;
	if (newCoord < rightBorder)
		return rightBorder;

	return Math.round(newCoord);
}

export default function useWheel(stageScale: TStageScale, setStageScale: TSetStageScale) {
	const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
		e.evt.preventDefault();

		if (!e.target) return;

		if (e.evt.ctrlKey) {
			const scaleBy = 1.1;
			const stage: Konva.Stage | null = e.target.getStage();

			if (!stage) return;

			const pointerPosition = stage.getPointerPosition();

			if (!pointerPosition) return;

			const oldScale = stage.scaleX();
			const mousePointTo = {
				x: pointerPosition?.x / oldScale - stage.x() / oldScale,
				y: pointerPosition?.y / oldScale - stage.y() / oldScale,
			};

			const newScale = Math.round((e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy) * 10) / 10;
			let newStageX = (pointerPosition.x / newScale - mousePointTo.x) * newScale;
			let newStageY = (pointerPosition.y / newScale - mousePointTo.y) * newScale;

			if (newScale < 1 || newScale > 5)
				return

			newStageX = borderCollision(newStageX, newScale);
			newStageY = borderCollision(newStageY, newScale);

			console.log(newScale);

			setStageScale({
				scale: newScale,
				stageX: newStageX,
				stageY: newStageY,
			});
			return;
		} else if (e.evt.shiftKey) {
			const scrollDist = 20;
			let newStageX = e.evt.deltaY > 0 ? stageScale.stageX - scrollDist : stageScale.stageX + scrollDist

			newStageX = borderCollision(newStageX, stageScale.scale)
			console.log(newStageX)

			setStageScale({
				...stageScale,
				stageX: newStageX,
			});
			return;
		} else {
			const scrollDist = 20;
			let newStageY = e.evt.deltaY > 0 ? stageScale.stageY - scrollDist : stageScale.stageY + scrollDist

			newStageY = borderCollision(newStageY, stageScale.scale)
			console.log(newStageY)

			setStageScale({
				...stageScale,
				stageY: newStageY,
			});
			return;
		}
	};
	return handleWheel
}