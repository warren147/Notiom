import React from 'react'
import { Text, Flex, Heading} from '@chakra-ui/react'

const MainTitle = () => {
  return (
    <Flex
    direction="column"
    align="center"
    justify="center"
    textAlign="center"
    p={{ base: 4, md: 8 }}
    mt={"35px"}
    
  >
    <Heading mb={30} fontSize={"60px"}>
      Create. Explore.
    </Heading>
    <Text fontSize={"40px"} color="#545454">
      The document editing software you've been waiting for
    </Text>
  </Flex> 
    
  )
}

export default MainTitle