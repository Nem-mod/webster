import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import { useAppDispatch } from "../../hooks/redux";
import { fetchDeleteCanvas } from "../../redux/slices/canvases/canvases-slice.service";

export default function DeleteCanvasModal({ canvasId, isOpen, onOpenChange }) {
  const dispatch = useAppDispatch()
  const handleDeleteCanvas = () => {
    dispatch(fetchDeleteCanvas(canvasId))
    onOpenChange()
  }

  return (
    <Modal backdrop={`blur`} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className={'flex flex-col gap-1 text-center'}>
              Canvas deletion
            </ModalHeader>
            <ModalBody>
              <p>
                Do you really want to delete this canvas? It is <span className={'text-accent-light font-bold'}>irreservable!</span>
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' variant='light' onPress={onClose}>
                No
              </Button>
              <Button color='danger' onPress={handleDeleteCanvas}>
                Yes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}