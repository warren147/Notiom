// pages/index.tsx
import { VStack } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import MainTitle from '../components/MainTitle';
import DocumentList from '../components/DocumentList';
import { NotiomDoc } from '../types';

export default function Page({ documents }: { documents: NotiomDoc[] }) {
  return (
    <VStack m="10px" width="100%">
      <Navbar />
      <MainTitle />
      <DocumentList documents={documents} />
    </VStack>
  );
}

export async function getServerSideProps(context: any) {
  const res = await fetch(
    `http://localhost:3000/api/getUserDocs?userId=${process.env.NEXT_PUBLIC_USER_NAME}`,
  ); // Replace 'USER_ID' with the actual user ID
  const documents = await res.json();

  return {
    props: { documents }, // will be passed to the page component as props
  };
}
