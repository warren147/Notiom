import { NotiomDoc } from '@/types';
import {
  Box,
  Text,
  useColorModeValue,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

interface TileProps {
  doc: NotiomDoc;
  deleteTile: () => void;
}

const Tile: React.FC<TileProps> = ({ doc, deleteTile }) => {
  const router = useRouter();
  const tileBg = useColorModeValue('#F8F8F8', '#1A202C');
  const tileBorder = useColorModeValue('#A3A3A3', '#4A5568');
  const tileText = useColorModeValue('#1A202C', 'gray.100');
  const metaText = useColorModeValue('gray.600', 'gray.400');

  const navigateToDoc = () => {
    router.push(`/doc/${doc._id}`);
  };

  const plainTextBody = doc.body ? doc.body.replace(/<[^>]+>/g, '') : '';

  const updatedLabel = doc.updatedAt
    ? new Date(doc.updatedAt).toLocaleString()
    : null;

  return (
    <Box
      role="button"
      onClick={navigateToDoc}
      width="100%"
      height="180px"
      borderWidth="2px"
      borderColor={tileBorder}
      backgroundColor={tileBg}
      borderRadius="10px"
      padding={4}
      transition="background-color 0.3s ease, border-color 0.3s ease, transform 0.2s ease"
      _hover={{ transform: 'scale(1.03)' }}
      position="relative"
      overflow="hidden"
    >
      <IconButton
        aria-label="Delete document"
        icon={<DeleteIcon />}
        size="sm"
        position="absolute"
        top={2}
        right={2}
        variant="ghost"
        color={metaText}
        _hover={{ color: 'red.500', background: 'transparent' }}
        onClick={(event) => {
          event.stopPropagation();
          deleteTile();
        }}
      />
      <VStack align="flex-start" spacing={2} height="100%">
        <Text
          fontSize="xl"
          fontWeight="bold"
          color={tileText}
          noOfLines={2}
          maxWidth="80%"
        >
          {doc.title ? doc.title : 'UNTITLED'}
        </Text>
        <Text fontSize="sm" color={metaText} noOfLines={3} flexGrow={1}>
          {plainTextBody || 'Start writing your document...'}
        </Text>
        {updatedLabel && (
          <Text fontSize="xs" color={metaText} mt="auto">
            Updated {updatedLabel}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default Tile;
