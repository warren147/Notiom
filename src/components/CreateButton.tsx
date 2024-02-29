import React from 'react';
import { Button, Box } from '@chakra-ui/react';

export const CreateButton = () => {
    return (
      <Box mr={{ base: "49px", md: "49px" }}>
      <Button
        bg="#2F80ED"
        color="white"
        _hover={{ bg: 'blue.600' }}
        _active={{ bg: 'blue.700' }}
        borderRadius="10px"
        width="129px"
        height="48px"
        fontFamily="'DM Sans', sans-serif"
        fontSize="24px"
      >
        Create
      </Button>
    </Box>
    );
  };