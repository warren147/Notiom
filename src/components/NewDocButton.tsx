import { Box, Image, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NotiomDoc } from '@/types';

interface NewDocProps {
  addDoc: (doc: { title: string; body: string }) => Promise<NotiomDoc | null>;
}

const NewDocButton: React.FC<NewDocProps> = ({ addDoc }) => {
  const router = useRouter();
  const toast = useToast();

  const handleCreate = async () => {
    const created = await addDoc({ title: '', body: '' });
    if (created) {
      router.push(`/doc/${created._id}`);
    } else {
      toast({
        title: 'Unable to create document',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <button onClick={handleCreate}>
      <Box
        _hover={{
          transform: 'scale(1.05)',
        }}
        transition="transform 0.2s"
      >
        <Image
          height="180px"
          width="180px"
          src="/create-doc.svg"
          alt="Create Document Tile"
        />
      </Box>
    </button>
  );
};

export default NewDocButton;
