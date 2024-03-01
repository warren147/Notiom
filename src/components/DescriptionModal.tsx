// DescriptionModal.js
import React from 'react';
import {
  Box, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, ModalFooter, Button, Input
} from '@chakra-ui/react';

export const DescriptionModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Box as="label" htmlFor="description" mb="8px">Description:</Box>
            <Input
              id="description"
              placeholder="Enter description here:"
              size="md"
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Save
          </Button>
          <Button onClick={onClose} mr={3}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};


