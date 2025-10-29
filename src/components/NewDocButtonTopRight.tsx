import { Box, Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NotiomDoc } from '@/types';

interface NewDocProps {
  addDoc: (doc: { title: string; body: string }) => Promise<NotiomDoc | null>;
}

const NewDocButtonTopRight: React.FC<NewDocProps> = ({ addDoc }) => {
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
    <Box position="fixed" top="20px" right="20px" zIndex="tooltip">
      {/* <Button
        onClick={handleCreate}
        bg="#2F80ED"
        color="white"
        _hover={{ bg: 'blue.600' }}
        _active={{ bg: 'blue.700' }}
        borderRadius="10px"
        width="129px"
        height="48px"
        fontFamily="'DM Sans', sans-serif"
        fontSize="24px"
      >
        Create
      </Button> */}
    </Box>
  );
};

export default NewDocButtonTopRight;
