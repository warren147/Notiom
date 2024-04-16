// components/Tile.js
import { NotiomDoc } from '@/types';
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

const NewDocButton: React.FC<NewDocProps> = ({ addDoc }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('Untitled');
  const [contents, setContents] = useState('');
  return (
    <>
      <button onClick={onOpen}>
        <Box
          _hover={{
            transform: 'scale(1.05)', // Adjust this value for the desired zoom level
          }}
          transition="transform 0.2s" // Adjust this value for the desired zoom speed
        >
          <Image
            height="200px"
            width="200px"
            src="/create-doc.svg"
            alt="SVG Tile"
          />
        </Box>
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </ModalHeader>
          <ModalBody>
            <Textarea
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
            <Button
              variant="ghost"
              onClick={() => {
                setContents('');
                onClose();
              }}
            >
              Discard
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewDocButton;
