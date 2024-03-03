import React from 'react';
import { Box, Text } from '@chakra-ui/react';

interface DescriptionDisplayProps {
  description: string;
}

export const DescriptionDisplay: React.FC<DescriptionDisplayProps> = ({ description }) => {
  return (
    <Box mt={4} p={4} bg="gray.100" w={200} h={200}>
      <Text mt={2}>{description}</Text>
    </Box>
  );
};


