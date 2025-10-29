import Head from 'next/head';
import { GetServerSideProps } from 'next';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  useColorModeValue,
  useToast,
  Divider,
  HStack,
} from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import RichTextEditor from '@/components/RichTextEditor';
import { ActivityLog, NotiomDoc } from '@/types';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

interface DocPageProps {
  initialDoc: NotiomDoc;
  initialActivities: ActivityLog[];
}

const DocumentPage: React.FC<DocPageProps> = ({ initialDoc, initialActivities }) => {
  const toast = useToast();

  const [title, setTitle] = useState(initialDoc.title);
  const [body, setBody] = useState(initialDoc.body);
  const [isSaving, setIsSaving] = useState(false);
  const [activities, setActivities] = useState<ActivityLog[]>(initialActivities);
  const [savedDoc, setSavedDoc] = useState(initialDoc);

  const hasChanges = useMemo(() => {
    return title !== savedDoc.title || body !== savedDoc.body;
  }, [title, body, savedDoc.title, savedDoc.body]);

  const metaColor = useColorModeValue('gray.600', 'gray.400');
  const sidebarBg = useColorModeValue('rgba(248, 248, 248, 0.65)', 'gray.800');
  const sidebarBorder = useColorModeValue('gray.200', 'gray.700');

  const refreshActivities = useCallback(async () => {
    try {
      const response = await fetch(`/api/activities?docId=${savedDoc._id}`);
      if (!response.ok) {
        throw new Error('Failed to load activity');
      }
      const logs: ActivityLog[] = await response.json();
      setActivities(Array.isArray(logs) ? logs : []);
    } catch (error) {
      console.error(error);
    }
  }, [savedDoc._id]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/updateDoc', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: savedDoc._id,
          title,
          body,
        }),
      });

      if (!response.ok) {
        let message = 'Failed to update document';
        try {
          const payload = await response.json();
          if (payload?.error) {
            message = payload.error;
          }
        } catch (jsonError) {
          // ignore JSON parse errors; we'll fall back to default message
        }
        throw new Error(message);
      }

      const updated = await response.json();
      const normalized: NotiomDoc = {
        _id: updated._id,
        title: updated.title,
        body: updated.body,
        user: updated.user ?? savedDoc.user,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
      };

      setSavedDoc(normalized);
      setTitle(normalized.title);
      setBody(normalized.body);
      toast({
        title: 'Document saved',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      refreshActivities();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Save failed',
        description:
          error instanceof Error ? error.message : 'Something went wrong while saving.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  }, [savedDoc._id, title, body, toast, refreshActivities, savedDoc.user]);

  const lastUpdated = savedDoc.updatedAt
    ? new Date(savedDoc.updatedAt).toLocaleString()
    : null;

  return (
    <>
      <Head>
        <title>{savedDoc.title ? `${savedDoc.title} – Notiom` : 'Document – Notiom'}</title>
      </Head>
      <VStack width="100%" spacing={4} align="stretch" minH="100vh">
        <Navbar />
        <Flex
          width="95%"
          margin="0 auto 40px"
          gap={8}
          align="flex-start"
          flexWrap={{ base: 'wrap', lg: 'nowrap' }}
        >
          <Box flex="1" minW={{ base: '100%', lg: '0' }}>
            <VStack align="stretch" spacing={4}>
              <Input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Document Title"
                size="lg"
                fontWeight="bold"
              />
              <RichTextEditor value={body} onChange={setBody} />
              <HStack justify="space-between" align="center" flexWrap="wrap" gap={4}>
                <Box>
                  {lastUpdated && (
                    <Text fontSize="sm" color={metaColor}>
                      Last updated {lastUpdated}
                    </Text>
                  )}
                </Box>
                <Button
                  colorScheme="blue"
                  onClick={handleSave}
                  isLoading={isSaving}
                  isDisabled={!hasChanges || isSaving}
                >
                  {isSaving ? 'Saving...' : hasChanges ? 'Save changes' : 'Saved'}
                </Button>
              </HStack>
            </VStack>
          </Box>
          <Box
            width={{ base: '100%', lg: '320px' }}
            borderWidth="1px"
            borderColor={sidebarBorder}
            borderRadius="lg"
            padding={4}
            background={sidebarBg}
          >
            <Heading as="h3" size="md" mb={3}>
              Activity
            </Heading>
            <Divider mb={3} />
            <VStack align="stretch" spacing={3} maxH="400px" overflowY="auto">
              {activities.length === 0 && (
                <Text fontSize="sm" color={metaColor}>
                  No activity yet. Start editing to see updates here.
                </Text>
              )}
              {activities.map((activity) => (
                <Box key={activity._id}>
                  <Text fontWeight="semibold" fontSize="sm">
                    {activity.message}
                  </Text>
                  <Text fontSize="xs" color={metaColor}>
                    {new Date(activity.timestamp).toLocaleString()}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
        </Flex>
      </VStack>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<DocPageProps> = async (context) => {
  const { id } = context.params ?? {};

  if (typeof id !== 'string') {
    return { notFound: true };
  }

  try {
    const client = await clientPromise;
    const db = client.db('notiom');
    const objectId = new ObjectId(id);

    const document = await db.collection('documents').findOne({ _id: objectId });

    if (!document) {
      return { notFound: true };
    }

    const activities = await db
      .collection('activities')
      .find({ documentId: objectId })
      .sort({ timestamp: -1 })
      .limit(25)
      .toArray();

    const initialDoc: NotiomDoc = {
      _id: id,
      title: document.title ?? '',
      body: document.body ?? '',
      user: document.user ?? null,
      createdAt: document.createdAt ? document.createdAt.toISOString() : undefined,
      updatedAt: document.updatedAt ? document.updatedAt.toISOString() : undefined,
    };

    const initialActivities: ActivityLog[] = activities.map((log) => ({
      _id: log._id.toString(),
      documentId: log.documentId.toString(),
      type: log.type,
      message: log.message,
      timestamp: log.timestamp instanceof Date ? log.timestamp.toISOString() : log.timestamp,
    }));

    return {
      props: {
        initialDoc,
        initialActivities,
      },
    };
  } catch (error) {
    console.error('Failed to load document', error);
    return { notFound: true };
  }
};

export default DocumentPage;
