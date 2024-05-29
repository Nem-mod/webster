import { Image } from "react-konva";
import { useImage } from "react-konva-utils";
import { ICanvasElement } from "../../services/canvas/canvas.types";

interface IProps {
	shape: ICanvasElement;
	index?: number;
	onChange?: (index: number, element: Partial<ICanvasElement>) => void;
}
export default function ImageElement({ shape: { src, ...shapeProps }, index, onChange }: IProps) {
	const [image, status] = useImage(src);
	return <Image image={image} {...shapeProps} />;
}
