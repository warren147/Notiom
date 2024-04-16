import React from 'react'
import { Text, VStack } from '@chakra-ui/react'

const MainTitle = () => {
  return (
    <VStack mt="60px" alignItems="center">
        <Text textStyle="h1" fontSize={50}>Create. Explore</Text>
        <Text textStyle="h2" fontSize={30}>{"The document editing software you've been waiting for"}</Text>
    </VStack>
    
  )
}

export default MainTitle