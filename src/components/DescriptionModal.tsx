import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Box } from '@chakra-ui/react';

export const DescriptionModal = ({ isOpen, onClose, onSave }) => {
  const [description, setDescription] = useState('');

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

