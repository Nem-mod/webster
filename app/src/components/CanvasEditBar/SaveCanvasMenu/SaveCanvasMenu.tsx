import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setSelectedElements } from '../../../redux/slices/canvasSlice/canvas-slice';
import { jsPDF } from 'jspdf';
import { exportStageSVG } from 'react-konva-to-svg';

function downloadURI(uri: string, name: string) {
	const link = document.createElement('a');
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

interface IProps {
	stageRef: any;
}

export default function SaveCanvasMenu({ stageRef }: IProps) {
	const dispatch = useAppDispatch();
	const stageName = useAppSelector((state) => state.canvas.data?.title);
	// Save
	const handleExportAsPNG = async () => {
		if (!stageRef?.current) return;
		const stage = stageRef.current;
		await dispatch(setSelectedElements({ elementIndexes: [] }));
		const uri = stage.getStage().toDataURL({
			pixelRatio: 2,
		});
		// we also can save uri as file
		// but in the demo on Konva website it will not work
		// because of iframe restrictions
		// but feel free to use it in your apps:
		downloadURI(uri, `${stageName}.png`);
	};

	const handleExportAsSVG = async () => {
		if (!stageRef?.current) return;
		const stage = stageRef.current;
		await dispatch(setSelectedElements({ elementIndexes: [] }));
		const result = await exportStageSVG(stage, false, {});

		const blob = new Blob([result], { type: 'image/svg+xml' });
		const url = window.URL.createObjectURL(blob);

		const link = document.createElement('a');
		link.href = url;
		link.download = `${stageName}.svg`;
		link.click();

		// Revoke the temporary URL to avoid memory leaks
		window.URL.revokeObjectURL(url);
	};

	const handleExportAsPDF = async () => {
		if (!stageRef?.current) return;
		const stage = stageRef.current;
		await dispatch(setSelectedElements({ elementIndexes: [] }));
		const pdf = new jsPDF('l', 'px', [stage.width(), stage.height()]);

		pdf.addImage(
			stage.toDataURL({ pixelRatio: 2 }),
			0,
			0,
			stage.width(),
			stage.height()
		);
		pdf.save(`${stageName}.pdf`);
	};
	return (
		<Dropdown>
			<DropdownTrigger>
				<Button>Save canvas</Button>
			</DropdownTrigger>
			<DropdownMenu aria-label='Static Actions'>
				<DropdownItem key='png' onClick={handleExportAsPNG}>Save as image</DropdownItem>
				<DropdownItem key='svg' onClick={handleExportAsSVG}>Save as SVG</DropdownItem>
				<DropdownItem key='pdf' onClick={handleExportAsPDF}>Save as PDF</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
