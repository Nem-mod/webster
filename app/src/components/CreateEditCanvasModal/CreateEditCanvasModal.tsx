import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Input,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import {
	fetchCreateCanvas,
	fetchUpdateCanvas,
} from '../../redux/slices/canvases/canvases-slice.service';
import {
	ICanvas,
	IUpdateCanvas,
} from '../../redux/slices/canvases/canvases-slice.types.ts';

interface IProps {
	canvas: ICanvas;
	isOpen: boolean;
	onOpenChange: () => void;
}

export default function CreateEditCanvasModal({
	canvas,
	isOpen,
	onOpenChange,
}: IProps) {
	const dispatch = useAppDispatch();
	const [canvasName, setCanvasName] = useState<string>(
		canvas ? canvas.canvasName : 'My new Canvas'
	);
	const [canvasNameError, setCanvasNameError] = useState<string | null>();

	useEffect(() => {
		if (canvasName.length > 40) {
			setCanvasNameError('Canvas name is too long');
		} else if (canvasName.length <= 2) {
			setCanvasNameError('Canvas name is too short');
		} else {
			setCanvasNameError(null);
		}
	}, [canvasName]);

	const [canvasWidth, setCanvasWidth] = useState<string>(
		canvas && canvas.resolution[0].toString()
	);
	const [canvasHeight, setCanvasHeight] = useState<string>(
		canvas && canvas.resolution[1].toString()
	);
	const [widthIsInvalid, setWidthIsInvalid] = useState(false);
	const [heightIsInvalid, setHeightIsInvalid] = useState(false);

	useEffect(() => {
		const width = Number(canvasWidth);
		const height = Number(canvasHeight);
		const isValidCheck = (
			value: number | unknown,
			callback: (val: boolean) => void
		) => {
			callback(!(Number.isInteger(value) && value > 100 && value < 3000));
		};
		isValidCheck(width, setWidthIsInvalid);
		isValidCheck(height, setHeightIsInvalid);
	}, [canvasWidth, canvasHeight]);

	const handleCreateNewCanvas = async () => {
		if (!canvasName) return;
		const { error } = await dispatch(
			fetchCreateCanvas({
				canvasName: canvasName,
				resolution: [parseInt(canvasWidth), parseInt(canvasHeight)], // TODO: set resolution here
				canvas: {
					elements: [],
				},
			})
		);
		if (!error) {
			onOpenChange();
		}
	};

	const handleUpdateCanvas = async () => {
		const updateData: IUpdateCanvas = {
			_id: canvas._id,
		};

		if (canvasWidth && canvasHeight) {
			updateData.resolution = [+canvasWidth, +canvasHeight];
		}
		if (canvasName) {
			updateData.canvasName = canvasName;
		}
		dispatch(fetchUpdateCanvas(updateData));
	};

	//TODO: create canvas with given resolutions
	// TODO: get resolution presets from server
	const setResolution = (key) => {
		const [width, height] = key.split('x');

		setCanvasHeight(height);
		setCanvasWidth(width);
	};

	return (
		<Modal backdrop={`blur`} isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						{canvas ? (
							<ModalHeader className='flex flex-col gap-1 text-center'>
								Update Canvas
							</ModalHeader>
						) : (
							<ModalHeader className='flex flex-col gap-1 text-center'>
								New Canvas
							</ModalHeader>
						)}

						<ModalBody>
							<Input
								label={'Name'}
								value={canvasName}
								isInvalid={Boolean(canvasNameError)}
								errorMessage={canvasNameError}
								onChange={(e) => setCanvasName(e.target.value)}
								required
							/>
							<div className={'flex gap-3 items-center'}>
								<Input
									type={'number'}
									label={'Width'}
									isInvalid={widthIsInvalid}
									errorMessage={'Incorrect value'}
									value={canvasWidth}
									onChange={(e) => setCanvasWidth(e.target.value)}
									required
								/>
								<Input
									type={'number'}
									isInvalid={heightIsInvalid}
									errorMessage={'Incorrect value'}
									label={'Height'}
									value={canvasHeight}
									onChange={(e) => setCanvasHeight(e.target.value)}
									required
								/>
								<Dropdown>
									<DropdownTrigger>
										<Button variant='bordered'>Presets</Button>
									</DropdownTrigger>
									<DropdownMenu
										aria-label='Static Actions'
										className={'overflow-auto max-h-80'}
										onAction={setResolution}
									>
										<DropdownItem key='1280x720'>HD (1280x720)</DropdownItem>
										<DropdownItem key='1920x1080'>
											FullHD (1920x1080)
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button color='danger' variant='light' onPress={onClose}>
								Cancel
							</Button>
							{canvas ? (
								<Button color='primary' onPress={handleUpdateCanvas}>
									Update
								</Button>
							) : (
								<Button color='primary' onPress={handleCreateNewCanvas}>
									Create
								</Button>
							)}
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
