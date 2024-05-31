import { useEffect } from "react";
import { deleteElement, reviewHistory } from "../../redux/slices/canvasSlice/canvas-slice";
import { useAppDispatch } from "../redux";

export default function useCanvasKeyboard() {
	const dispatch = useAppDispatch()
	useEffect(() => {
		const callback = (event: KeyboardEvent) => {
			const handleMoveHistory = (type: boolean) => {
				dispatch(reviewHistory({ type }));
			};

			if ((event.metaKey || event.ctrlKey) && event.code === 'KeyZ') {
				handleMoveHistory(true);
			}
			if ((event.metaKey || event.ctrlKey) && event.code === 'KeyY') {
				handleMoveHistory(false);
			}
			if (event.key === 'Delete') {
				dispatch(deleteElement());
			}
		};
		document.addEventListener('keydown', callback);
		return () => {
			document.removeEventListener('keydown', callback);
		};
	}, []);

} 