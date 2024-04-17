
import { Flex, Grid, Image } from '@chakra-ui/react';
import Tile from './Tile';
import React, { useState } from 'react';
import NewDocButton from './NewDocButton';
import { NotiomDoc } from '@/types';
import { create } from 'domain';
import NewDocButtonTopRight from './NewDocButtonTopRight';

interface DocumentListProps {
  documents: NotiomDoc[];
}

const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  const [allDocs, setAllDocs] = useState<NotiomDoc[]>(documents);

  const addDoc = async (newDoc: { title: string; body: string }) => {
    try {
      const docToCreate = {
        title: newDoc.title,
        body: newDoc.body,
      };

      const response = await fetch('/api/createDoc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(docToCreate),
      });

      let createdDoc = await response.json();
      setAllDocs((prevDocs) => [...prevDocs, createdDoc]);
    } catch (error) {
      console.error('Failed to create the document:', error);
    }
  };

  const deletetile = async (docId: string) => {
    try {
      const response = await fetch(`/api/deleteDoc?docId=${docId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const newDocs = allDocs.filter((doc) => doc._id.toString() !== docId);
        setAllDocs(newDocs);
      } else {
        console.error('Failed to delete the document');
      }
    } catch (error) {
      console.error('There was an error deleting the document:', error);
    }
  };

  return (
    <>
      <Grid
        mt="50px"
        width="95%"
        templateColumns="repeat(auto-fill, minmax(180px, 1fr))"
        gap={10}
      >
        <NewDocButton addDoc={addDoc} />
        {allDocs.map((doc) => (
          <Tile
            doc={doc}
            key={doc._id.toString()}
            deleteTile={() => deletetile(doc._id.toString())}
          />
        ))}
      </Grid>
      <NewDocButtonTopRight addDoc={addDoc} />
    </>
  );
}

export default DocumentList;
