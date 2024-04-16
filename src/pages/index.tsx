// pages/index.tsx
import { VStack } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import MainTitle from '../components/MainTitle';
import DocumentList from '../components/DocumentList';
import { NotiomDoc } from '../types';
import React from 'react';
import Head from 'next/head';


export default function Page({ documents }: { documents: NotiomDoc[] }) {
  return (
    <>
    <Head>
        <title>Notiom</title>
        <meta name="description" content="The bootleg notion" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/notiom-logo.svg" />
      </Head>
    <VStack m="10px" width="100%">
      <Navbar />
      <MainTitle />
      <DocumentList documents={documents} />
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
