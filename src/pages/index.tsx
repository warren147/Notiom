import Head from "next/head";
import { Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { NotiomLogo } from "@/components/NotiomLogo";
import { CreateButton } from "@/components/CreateButton";
import { MainCreateButton } from "@/components/MainCreateButton";
import { Main } from "next/document";

export default function Home() {
  return (
    <>
      <Head>
        <title>Notiom</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex mt={29} ml={49} id="navBar">
        <NotiomLogo />
        <Heading
          fontFamily={`"DM Sans", sans-serif`}
          color="#545454"
          fontSize={40}
          ml={5}
          w={142}
        >
          Notiom
        </Heading>
        <Spacer />
        <CreateButton />
      </Flex>
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
      <Flex ml={49} mt={50}>
        <MainCreateButton/>
      </Flex>
    </>
  );
}
