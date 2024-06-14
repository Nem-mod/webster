import { useAppDispatch } from '../../../hooks/redux';
import { addElement } from '../../../redux/slices/canvasSlice/canvas-slice';
import { CanvasElementType } from '../../../services/canvas/canvas-element-types.enum';
import CanvasElementFactory from '../../../services/canvas/canvas.service';
import { Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react"


interface IProps {
	type: CanvasElementType;
}

const icons = {
	image: "../../../../public/image_icon.png",
	text: "../../../../public/text_icon.png",
	circle: "../../../../public/circle_icon.png",
	rect: "../../../../public/rectangle_icon.png",
	ellipse: "../../../../public/ellipse_icon.png",
	star: "../../../../public/star_icon.png",
	ring: "../../../../public/ring_icon.png",
	arrow: "../../../../public/arrow_icon.png",
	arc: "../../../../public/arc_icon.png",
}

export default function CanvasMenuButton({ type }: IProps) {
	const dispatch = useAppDispatch();

	const handleClick = () => {
		const creator = CanvasElementFactory.getCreator(type);
		const element = creator();
		dispatch(addElement(element));
	};
	return (
		<Button isIconOnly onClick={handleClick} className={' bg-gray-200'} size='sm'>
			{/* {type} */}
			<Image src={icons[type]} width={20} height={20} radius='none'/>
		</Button>
	);
}
