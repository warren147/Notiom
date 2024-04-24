import React from 'react';
import { Button, HStack, Text, Image } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <HStack justifyContent="space-between" width="95%" m="10px 30px">
      <HStack spacing="20px">
        <Image src="/notiom-logo.svg" boxSize="50px" alt="Notiom Logo" />
        <Text           
          fontFamily={`"DM Sans", sans-serif`}
          color="#545454"
          fontSize={40}

        >
            Notiom
            </Text>
      </HStack>
{/* 
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
      </Button> */}
    </HStack>
  );
};


export default Navbar;
