import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Input,
	Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from '@nextui-org/react';
import {useState} from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { fetchCreateCanvas } from '../../redux/slices/canvases/canvases-slice.service';
import {ICanvas} from "../../redux/slices/canvases/canvases-slice.types.ts";

interface IProps {
	canvas: ICanvas;
	isOpen: boolean;
	onOpenChange: () => void;
}

export default function CreateEditCanvasModal({ canvas, isOpen, onOpenChange }: IProps) {
	const [canvasName, setCanvasName] = useState<string>(canvas ? canvas.canvasName : 'My new Canvas');
	const [canvasWidth, setCanvasWidth] = useState<string>(canvas && canvas.resolution[0].toString());
	const [canvasHeight, setCanvasHeight] = useState<string>(canvas && canvas.resolution[1].toString());
	const dispatch = useAppDispatch();

	const handleCreateNewCanvas = async () => {
		if (!canvasName) return;
		const { error } = await dispatch(
			fetchCreateCanvas({
				canvasName: canvasName,
				resolution: [1000, 1000], // TODO: set resolution here
				canvas: {
					elements: []
				}
			})
		);
		if (!error) {
			onOpenChange();
		}
	};

	const handleUpdateCanvas = async () => {
		// TODO: update canvas info
	}


	//TODO: create canvas with given resolutions
	// TODO: get resolution presets from server
	const setResolution = (key) => {
		const [width, height] = key.split('x')

		setCanvasHeight(height)
		setCanvasWidth(width)
	}

	return (
		<Modal backdrop={`blur`} isOpen={isOpen} onOpenChange={onOpenChange} >
			<ModalContent>
				{(onClose) => (
					<>
						{canvas ?
							<ModalHeader className='flex flex-col gap-1 text-center'>Update Canvas</ModalHeader> :
							<ModalHeader className='flex flex-col gap-1 text-center'>New Canvas</ModalHeader>
						}

						<ModalBody>
							<Input
								label={'Name'}
								value={canvasName}
								onChange={(e) => setCanvasName(e.target.value)}
							/>
							<div className={'flex gap-3 items-center'}>
								<Input
									label={'Width'}
									value={canvasWidth}
									onChange={(e) => setCanvasHeight(e.target.value)}
									required
								/>
								<Input
									label={'Height'}
									value={canvasHeight}
									onChange={(e) => setCanvasHeight(e.target.value)}
									required
								/>
								<Dropdown>
									<DropdownTrigger>
										<Button
											variant="bordered"
										>
											Presets
										</Button>
									</DropdownTrigger>
									<DropdownMenu aria-label="Static Actions" className={'overflow-auto max-h-80'} onAction={setResolution}>
										<DropdownItem key="1280x720">HD (1280x720)</DropdownItem>
										<DropdownItem key="1920x1080">FullHD (1920x1080)</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button color='danger' variant='light' onPress={onClose}>
								Cancel
							</Button>
							{canvas ?
								<Button color='primary' onPress={handleUpdateCanvas}>
									Update
								</Button> :
								<Button color='primary' onPress={handleCreateNewCanvas}>
									Create
								</Button>
							}
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
