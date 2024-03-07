import React, { useState } from "react";
import { Box, Button, useDisclosure, Image } from "@chakra-ui/react";
import { DescriptionModal } from "/Users/warrenchang/Bootcamp/notiom/src/components/DescriptionModal";
import { DescriptionDisplay } from "/Users/warrenchang/Bootcamp/notiom/src/components/Document";

export const MainCreateButton = () => {
  const [description, setSavedDescription] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box mr={{ base: "49px", md: "49px" }}>
      <Button
        onClick={onOpen}
        bg="#2F80ED"
        color="white"
        _hover={{ bg: "blue.600" }}
        _active={{ bg: "blue.700" }}
        borderRadius="10px"
        width="150px"
        height="150px"
        fontFamily="'DM Sans', sans-serif"
      >
        <Image src="create.png" width="230%" height="230%" objectFit="cover" />
      </Button>

      <DescriptionModal isOpen={isOpen} onClose={onClose} onSave={setSavedDescription}/>
      {/* <DescriptionDisplay description={description}/> */}
    </Box>
  );
};
