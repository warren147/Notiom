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
  useDisclosure,
  Button,
  Textarea,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';

interface TileProps {
  doc: NotiomDoc;
  deleteTile: () => void;
}

const Tile: React.FC<TileProps> = ({ doc, deleteTile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(doc.title);
  const [titleDraft, setTitleDraft] = useState(doc.title);
  const [content, setContent] = useState(doc.body);

  const condenseTitle = (title: string): string => {
    const words = title.split(' ');
    return words.length > 5 ? words.slice(0, 5).join(' ') + '...' : title;
  };

  const updateEntry = async () => {
    const updatedDoc = {
      _id: doc._id, 
      title: title,
      body: content, 
    };

    try {
      const response = await fetch('/api/updateDoc', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDoc),
      });

      if (!response.ok) {
        throw new Error('Failed to update the document');
      }

    
    } catch (error) {
      console.error('There was an error updating the document:', error);
    }
  };

  return (
    <>
      <button onClick={onOpen}>
        <Box
          width="180px"
          height="180px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderWidth="2px"
          borderColor="#A3A3A3"
          backgroundColor="#F8F8F8"
          borderRadius="10px"
          overflow="auto"
          textAlign="center"
          padding="0px"
        
    
          whiteSpace="normal"
          textOverflow="ellipsis"
          color="black"
          _hover={{
            transform: 'scale(1.05)', 
          }}
          transition="transform 0.2s"
        >
          <Text fontSize="30px" textStyle="body" fontFamily="'DM Sans', sans-serif" fontWeight='bold'>
            {title ? condenseTitle(title) : 'UNTITLED'}
          </Text>
        </Box>
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Edit Document
            <Input
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              placeholder="Document Title..."
              mt={3}
            />
            
          </ModalHeader>
          <ModalBody>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your document here..."
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                updateEntry();
                setTitle(titleDraft);
                onClose();
              }}
            >
              Save
            </Button>
            <Button
              colorScheme='red'
              onClick={() => {
                setTitleDraft(title);
                deleteTile();
                onClose();
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Tile;
