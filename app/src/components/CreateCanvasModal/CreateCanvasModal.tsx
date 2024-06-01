import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Input,
} from '@nextui-org/react';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { fetchCreateCanvas } from '../../redux/slices/canvases/canvases-slice.service';

export default function CreateCanvasModal() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [canvasName, setCanvasName] = useState<string>();
	const dispatch = useAppDispatch();
	const handleCreateNewCanvas = async () => {
		if (!canvasName) return;
		// TODO: add custom resolution
		const { error } = await dispatch(
			fetchCreateCanvas({
				canvasName: canvasName,
				resolution: [1000, 1000],
				canvas: []
			})
		);
		if (!error) {
			onOpenChange();
		}
	};
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
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>Label</ModalHeader>
							<ModalBody>
								<Input
									label={'Title'}
									value={canvasName}
									onChange={(e) => setCanvasName(e.target.value)}
								/>
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
