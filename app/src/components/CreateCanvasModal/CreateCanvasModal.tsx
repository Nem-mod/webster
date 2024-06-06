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

export default function CreateCanvasModal() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [canvasName, setCanvasName] = useState<string>('My new Canvas');
	const [canvasWidth, setCanvasWidth] = useState<string>();
	const [canvasHeight, setCanvasHeight] = useState<string>();
	const dispatch = useAppDispatch();

	const handleCreateNewCanvas = async () => {
		if (!canvasName) return;
		// TODO: add custom resolution
		const { error } = await dispatch(
			fetchCreateCanvas({
				canvasName: canvasName,
				resolution: [1000, 1000],
				canvas: {}
			})
		);
		if (!error) {
			onOpenChange();
		}
	};


	//TODO: create canvas with given resolutions
	// TODO: get resolution presets from server
	const setResolution = (key) => {
		const [width, height] = key.split('x')

		setCanvasHeight(height)
		setCanvasWidth(width)
	}

	return (
		<>
			<Button
				className={'text-xl bg-primary/90'}
				size={'lg'}
				color={'primary'}
				onPress={onOpen}
			>
				Create new
			</Button>
			<Modal backdrop={`blur`} isOpen={isOpen} onOpenChange={onOpenChange} >
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1 text-center'>New Canvas</ModalHeader>
							<ModalBody>
								<Input
									label={'Name (optional)'}
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
								<Button color='primary' onPress={handleCreateNewCanvas}>
									Create
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
