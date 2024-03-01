import React from "react";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { DescriptionModal } from "/Users/warrenchang/Bootcamp/notiom/src/components/DescriptionModal";

export const CreateButton = () => {
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
        width="129px"
        height="48px"
        fontFamily="'DM Sans', sans-serif"
        fontSize="24px"
      >
        Create
      </Button>

      <DescriptionModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
