import React, { useState } from 'react';
import { Box, Button, Flex, Image, useDisclosure } from '@chakra-ui/react';
import { DescriptionModal } from './DescriptionModal';

interface Document {
  id: number;
  content: string;
}

const initialDocuments: Document[] = [
  { id: 1, content: "hi" },
];

export const MainCreateButton = () => {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);

  const handleOpenModalForNewDocument = () => {
    setCurrentDocument(null);
    onOpen();
  };

  const handleSave = (updatedContent: string) => {
    const newDocument: Document = {
      id: documents.length ? Math.max(...documents.map(d => d.id)) + 1 : 1,
      content: updatedContent,
    };
    if (currentDocument) {
      setDocuments(docs =>
        docs.map(doc => doc.id === currentDocument.id ? { ...doc, content: updatedContent } : doc)
      );
    } else {
      setDocuments(docs => [...docs, newDocument]);
    }
    onClose();
  };

  const handleDelete = () => {
    if (currentDocument) {
      setDocuments(docs => docs.filter(doc => doc.id !== currentDocument.id));
    }
    onClose();
  };

  const handleDocumentClick = (doc: Document) => {
    setCurrentDocument(doc);
    onOpen();
  };

  const renderDocumentButtons = () => {
    return documents.map(doc => {
      const previewText = doc.content.split(' ').slice(0, 5).join(' ') + (doc.content.split(' ').length > 5 ? '...' : '');
      return (
        <Button
          key={doc.id}
          onClick={() => handleDocumentClick(doc)}
          bg="gray.100"
          color="black"
          borderColor="black"
          borderWidth="1px"
          marginLeft="2"
          _hover={{ bg: "gray.300" }}
          borderRadius="10px"
          width="150px"
          height="150px"
          fontFamily="'DM Sans', sans-serif"
          fontSize="24px"
          margin="20px"
          whiteSpace="normal"
          textOverflow="ellipsis"
        >
          {previewText}
        </Button>
      );
    });
  };

  return (
    <Flex align="center" wrap="wrap">
      <Button
        onClick={handleOpenModalForNewDocument}
        bg="#2F80ED"
        color="white"
        _hover={{ bg: "blue.600" }}
        _active={{ bg: "blue.700" }}
        borderRadius="10px"
        width="150px"
        height="150px"
        fontFamily="'DM Sans', sans-serif"
        margin="20px"
      >
        <Image src="create.png" alt="Create New" width="230%" height="230%" objectFit="cover"/>
      </Button>
      {renderDocumentButtons()}
      <DescriptionModal
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleSave}
        onDelete={handleDelete}
        initialDescription={currentDocument?.content || ''}
      />
    </Flex>
  );
};
