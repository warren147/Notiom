import React from 'react';
import { Button, HStack, Text, Image } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <HStack justifyContent="space-between" width="95%" m="10px 30px">
      <HStack spacing="30px">
        <Image src="/notiom-logo.svg" boxSize="50px" alt="Notiom Logo" />
        <Text fontSize="40px">Notiom</Text>
      </HStack>

      <Button
        fontSize="20px"
        color="white"
        mr="20px"
        left="10px"
        _hover={{
          transform: 'scale(1.05)', 
        }}
        transition="transform 0.2s" 
      >
        Create
      </Button>
    </HStack>
  );
};


export default Navbar;
