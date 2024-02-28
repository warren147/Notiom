import React from 'react';
import { Button, Image, Heading } from '@chakra-ui/react';

export const NotiomLogo = () => {
  return (
    <Image
      boxSize='48px'
      objectFit='cover'
      src='Vector.png'
    />
  );
};

export const CreateButton = () => {
  return (
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
      ml={1280}
    >
      Create
    </Button>
  );
};

export const NotiomLogoText = () => {
  return (
    <Heading 
      fontFamily={`"DM Sans", sans-serif`} 
      color="#545454" 
      fontSize={40} 
      ml = {5}
      w = {142}
    >
      Notiom
    </Heading>
  );
};
