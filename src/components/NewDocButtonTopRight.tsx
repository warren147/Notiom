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
      <Box
      position="fixed"
      top="20px"
      right="20px"
      zIndex="tooltip" 
    >
      <Button onClick={onOpen}
        bg="#2F80ED"
        color="white"
        _hover={{ bg: "blue.600" }}
        _active={{ bg: "blue.700" }}
        borderRadius="10px"
        width="129px"
        height="48px"
        fontFamily="'DM Sans', sans-serif"
        fontSize="24px"
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
      </Box>
    );
  };
  
  export default NewDocButtonTopRight;
  
  