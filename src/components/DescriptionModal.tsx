import React, { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Box } from '@chakra-ui/react';

interface DescriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (description: string) => void;
    initialDescription?: string;
  } 

export const DescriptionModal: React.FC<DescriptionModalProps> = ({ isOpen, onClose, onSave, initialDescription = '' }) => {
    const [description, setDescription] = useState(initialDescription);
  
    useEffect(() => {
      setDescription(initialDescription);
    }, [initialDescription]);
    
    const handleSave = () => {
      onSave(description);
      setDescription(''); 
      onClose(); 
    };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Box as="label" htmlFor="description" mb="8px">
              Description:
            </Box>
            <Input
              id="description"
              placeholder="Enter description here:"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose} mr={3}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

