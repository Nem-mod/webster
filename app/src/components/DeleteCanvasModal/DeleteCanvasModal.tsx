import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";

export default function DeleteCanvasModal({ canvasId, isOpen, onOpenChange }) {
  const handleDeleteCanvas = () => {
    console.log('delete canvas ' + canvasId) // TODO: request server to delete canvas
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