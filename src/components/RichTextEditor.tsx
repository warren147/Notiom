import React, { useEffect, useRef } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const toolbarBg = useColorModeValue('gray.50', 'gray.700');

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const execCommand = (command: string) => {
    if (typeof window === 'undefined') return;
    editorRef.current?.focus();
    document.execCommand(command, false);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (!editorRef.current) return;
    onChange(editorRef.current.innerHTML);
  };

  return (
    <Box border="1px" borderColor={borderColor} borderRadius="md" overflow="hidden">
      <HStack
        spacing={2}
        p={2}
        bg={toolbarBg}
        borderBottom="1px"
        borderColor={borderColor}
      >
        <ButtonGroup size="sm" isAttached variant="ghost">
          <Button onClick={() => execCommand('bold')} fontWeight="bold">
            B
          </Button>
          <Button onClick={() => execCommand('italic')} fontStyle="italic">
            I
          </Button>
          <Button onClick={() => execCommand('underline')} textDecoration="underline">
            U
          </Button>
        </ButtonGroup>
        <Divider orientation="vertical" height="20px" borderColor={borderColor} />
        <ButtonGroup size="sm" isAttached variant="ghost">
          <Button onClick={() => execCommand('insertUnorderedList')}>• List</Button>
          <Button onClick={() => execCommand('insertOrderedList')}>1. List</Button>
        </ButtonGroup>
      </HStack>
      <Box
        ref={editorRef}
        role="textbox"
        contentEditable
        suppressContentEditableWarning
        bg={bg}
        padding={4}
        minH="160px"
        overflowY="auto"
        onInput={handleInput}
        onBlur={handleInput}
        transition="background-color 0.3s ease, color 0.3s ease"
      />
    </Box>
  );
};

export default RichTextEditor;
