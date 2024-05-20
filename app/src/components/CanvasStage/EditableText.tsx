import { useEffect, useRef, useState } from 'react';
import { Text } from 'react-konva';
import { Html } from 'react-konva-utils';
import { ICanvasElement } from '../../services/canvas/canvas.types';

function getStyle(width, height) {
	const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	const baseStyle = {
		width: `${width}px`,
		height: `${height}px`,
		border: 'none',
		padding: '0px',
		margin: '0px',
		background: 'none',
		outline: 'none',
		color: 'white',
		fontSize: '16px',
		fontFamily: 'sans-serif',
	};
	if (isFirefox) {
		return baseStyle;
	}
	return {
		...baseStyle,
		margintop: '-4px',
	};
}

interface IEditableTextInput {
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	value?: string;
	onChange: (value: { text: string }) => void;
	setIsEditing: (value: boolean) => void;
}

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

function EditableTextInput({ x, y, width, height, value, setIsEditing, onChange }: IEditableTextInput) {
	const editTextRef = useRef<any>();

	const handleClickOutside = (event) => {
		if (editTextRef.current && !editTextRef.current.contains(event.target)) {
			setIsEditing(false);
		}
	};
	const handleEscapeKeys = (e) => {
		console.log('handleEscapeKeys', 'esc', e);
		if ((e.keyCode === RETURN_KEY && !e.shiftKey) || e.keyCode === ESCAPE_KEY) {
			setIsEditing(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);

	const style = getStyle(width, height);
	return (
		<Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
			<textarea ref={editTextRef} value={value} onChange={(e) => onChange({ text: e.target.value })} onKeyDown={handleEscapeKeys} style={style} />
		</Html>
	);
}

interface IProps {
	shape: ICanvasElement;
	index: number;
	onChange: (index: number, element: Partial<ICanvasElement>) => void;
}

export default function EditableText({ shape: { ref, ...shapeProps }, index, onChange }: IProps) {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const handleDoubleClick = () => {
		setIsEditing(true);
	};

	const handleChangeText = (value: { text: string }) => {
		onChange(index, value);
	};

	if (isEditing) {
		return <EditableTextInput {...shapeProps} value={shapeProps?.text} setIsEditing={setIsEditing} onChange={handleChangeText} />;
	}

	return <Text onDblClick={handleDoubleClick} onDblTap={handleDoubleClick} ref={ref} {...shapeProps} />;
}
