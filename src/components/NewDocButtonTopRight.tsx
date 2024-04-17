import {
    Box,
    Modal,
    Text,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Image,
    Textarea,
    Input,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  
  interface NewDocProps {
    addDoc: (doc: { title: string; body: string }) => void;
  }
  
  const NewDocButtonTopRight: React.FC<NewDocProps> = ({ addDoc }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState('');
    return (
      <>
        <Button onClick={onOpen}
            colorScheme='blue'
            fontSize="20px"
            width={100}
            color="white"
            mr="-1500px"
            mt="-500px"
            _hover={{
                transform: 'scale(1.05)', 
            }}
            transition="transform 0.2s"
        >
            Create
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Create New Document
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Document Title...'mt={3}/>
            </ModalHeader>
            <ModalBody>
              <Textarea
                placeholder="Write your document here..."
                value={contents}
                onChange={(e) => setContents(e.target.value)}
              />
            </ModalBody>
  
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  addDoc({ title: title, body: contents });
                  onClose();
                  setTitle('');
                  setContents('');
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default NewDocButtonTopRight;
  
  