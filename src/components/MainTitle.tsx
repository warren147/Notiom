import React from 'react'
import { Text, Flex, Heading, useColorModeValue } from '@chakra-ui/react'

const MainTitle = () => {
  const subtitleColor = useColorModeValue('#545454', 'gray.300');
  return (
    <Flex
    direction="column"
    align="center"
    justify="center"
    textAlign="center"
    p={{ base: 4, md: 8 }}
    mt={"35px"}
    
  >
    <Heading mb={30} fontSize={"60px"} transition="color 0.3s ease">
      Create. Explore.
    </Heading>
    <Text fontSize={"40px"} color={subtitleColor} transition="color 0.3s ease">
      The document editing software you&apos;ve been waiting for
    </Text>
  </Flex> 

  )
}

export default MainTitle
