import Head from "next/head";
import { VStack, useColorModeValue, useToast } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import MainTitle from '../components/MainTitle';
import DocumentList from '../components/DocumentList';
import { NotiomDoc } from '../types';
import React, { useCallback, useEffect, useState } from 'react';


export default function Page({ documents }: { documents: NotiomDoc[] }) {
  const containerBg = useColorModeValue('white', '#1A202C');
  const containerColor = useColorModeValue('#545454', 'gray.100');
  const [allDocuments, setAllDocuments] = useState<NotiomDoc[]>(documents ?? []);
  const toast = useToast();

  useEffect(() => {
    setAllDocuments(documents ?? []);
  }, [documents]);

  const handleSearch = useCallback(async (query: string) => {
    try {
      const searchParam = query ? `?q=${encodeURIComponent(query)}` : '';
      const response = await fetch(`/api/searchDocs${searchParam}`);
      if (!response.ok) {
        throw new Error('Failed to search documents');
      }
      const data: NotiomDoc[] = await response.json();
      setAllDocuments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Search failed',
        description: 'Unable to search documents right now.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  }, [toast]);
  return (
    <>
    <Head>
        <title>Notiom</title>
        <meta name="description" content="The bootleg notion" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/notiom-logo.svg" />
      </Head>
    <VStack
      m="10px"
      width="100%"
      bg={containerBg}
      color={containerColor}
      transition="background-color 0.4s ease, color 0.4s ease"
    >
      <Navbar onSearch={handleSearch} />
      <MainTitle />
      <DocumentList documents={allDocuments} setDocuments={setAllDocuments} />
    </VStack>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const res = await fetch(
    `http://localhost:3000/api/getUserDocs`,
  );
  const documents = await res.json();

  return {
    props: { documents }, 
  };
}
