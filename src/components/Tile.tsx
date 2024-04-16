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

  const updateEntry = async () => {
    const updatedDoc = {
      _id: doc._id, // Assuming you have the document's _id available as 'doc._id'
      title: title,
      body: content, // Assuming the body of the document is represented by 'content' state
    };

    try {
      // Make the PUT request to the updateDoc API endpoint
      const response = await fetch('/api/updateDoc', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDoc),
      });

      if (!response.ok) {
        // Handle any errors if the API request was not successful
        throw new Error('Failed to update the document');
      }

      // Here you could update the state to reflect the change, if needed
      // e.g., setAllDocs(prevDocs => prevDocs.map(doc => doc._id === updatedDoc._id ? updatedDoc : doc));
      // This is just an example and will depend on how you're managing state in your application
    } catch (error) {
      // Handle the error state appropriately
      console.error('There was an error updating the document:', error);
    }
  };

  return (
    <>
      <button onClick={onOpen}>
        <Box
          width="200px"
          height="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderWidth="2px"
          borderColor="#A3A3A3"
          backgroundColor="#F8F8F8"
          borderRadius="lg"
          overflow="auto"
          textAlign="center"
          padding="0px"
          _hover={{
            transform: 'scale(1.05)', // Adjust this value for the desired zoom level
          }}
          transition="transform 0.2s" // Adjust this value for the desired zoom speed
        >
          <Text fontSize="30px" textStyle="body">
            {title ? title : 'UNTITLED'}
          </Text>
        </Box>
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Input
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
            />
          </ModalHeader>
          <ModalCloseButton
            onClick={() => {
              setTitleDraft(title);
            }}
          />
          <ModalBody>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
              variant="ghost"
              onClick={() => {
                setTitleDraft(title);
                deleteTile();
                onClose();
              }}
            >
              Discard Doc
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Tile;
