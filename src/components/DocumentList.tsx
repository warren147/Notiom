import { Grid } from '@chakra-ui/react';
import Tile from './Tile';
import React from 'react';
import NewDocButton from './NewDocButton';
import { NotiomDoc } from '@/types';
import NewDocButtonTopRight from './NewDocButtonTopRight';

interface DocumentListProps {
  documents: NotiomDoc[];
  setDocuments: React.Dispatch<React.SetStateAction<NotiomDoc[]>>;
}

const DocumentList: React.FC<DocumentListProps> = ({ documents, setDocuments }) => {
  const allDocs = Array.isArray(documents) ? documents : [];

  const addDoc = async (newDoc: { title: string; body: string }): Promise<NotiomDoc | null> => {
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

      if (!response.ok) {
        throw new Error('Failed to create the document');
      }

      const createdDoc = await response.json();
      const created = createdDoc as NotiomDoc;
      setDocuments((prevDocs) => [
        created,
        ...(Array.isArray(prevDocs) ? prevDocs : []),
      ]);
      return created;
    } catch (error) {
      console.error('Failed to create the document:', error);
      return null;
    }
  };

  const deletetile = async (docId: string) => {
    try {
      const response = await fetch(`/api/deleteDoc?docId=${docId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDocuments((prevDocs) =>
          (Array.isArray(prevDocs) ? prevDocs : []).filter((doc) => doc._id !== docId),
        );
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
        {Array.isArray(allDocs) && allDocs.map((doc) => (
          <Tile
            doc={doc}
            key={doc._id}
            deleteTile={() => deletetile(doc._id)}
          />
        ))}
      </Grid>
      <NewDocButtonTopRight addDoc={addDoc} />
    </>
  );
}

export default DocumentList;
