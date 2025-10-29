import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  Image,
  Switch,
  useColorMode,
  useColorModeValue,
  Icon,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, SearchIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import NextLink from 'next/link';

const MotionBox = motion(Box);
const MotionSwitchWrapper = motion.div;

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue('#545454', 'gray.100');
  const logoFilter = useColorModeValue('none', 'invert(1)');
  const inactiveIconColor = useColorModeValue('gray.400', 'gray.500');
  const activeIconColor = useColorModeValue('#2F80ED', 'yellow.300');
  const inputBg = useColorModeValue('gray.100', 'gray.700');
  const inputColor = useColorModeValue('#1A202C', 'gray.100');
  const searchAccentColor = useColorModeValue('gray.500', 'gray.300');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (!onSearch) {
      return;
    }

    const handler = setTimeout(() => {
      onSearch(searchValue.trim());
    }, 300);

    return () => clearTimeout(handler);
  }, [searchValue, onSearch]);

  return (
    <Flex align="center" width="95%" m="10px 30px">
      <NextLink href="/" passHref legacyBehavior>
        <HStack
          as="a"
          spacing="20px"
          cursor="pointer"
          _hover={{ opacity: 0.85 }}
        >
          <Image
            src="/notiom-logo.svg"
            boxSize="50px"
            alt="Notiom Logo"
            filter={logoFilter}
          />
          <Text
            fontFamily={`"DM Sans", sans-serif`}
            color={textColor}
            fontSize={40}
          >
            Notiom
          </Text>
        </HStack>
      </NextLink>
      <Flex flex="1" justify="center" px={{ base: 2, md: 6 }}>
        {onSearch && (
          <InputGroup maxW="420px" width="100%">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color={searchAccentColor} />
            </InputLeftElement>
            <Input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search documents..."
              bg={inputBg}
              color={inputColor}
              border="none"
              boxShadow="sm"
              _placeholder={{ color: searchAccentColor }}
              _focus={{ boxShadow: 'outline' }}
            />
          </InputGroup>
        )}
      </Flex>
      <HStack spacing="10px" alignItems="center" ml="auto">
        <MotionBox
          animate={{
            scale: colorMode === 'light' ? 1.2 : 0.9,
            opacity: colorMode === 'light' ? 1 : 0.5,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <Icon
            as={SunIcon}
            boxSize="24px"
            color={colorMode === 'light' ? activeIconColor : inactiveIconColor}
            aria-hidden
          />
        </MotionBox>
        <MotionSwitchWrapper
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <Switch
            isChecked={colorMode === 'dark'}
            onChange={toggleColorMode}
            aria-label="Toggle color mode"
            sx={{
              'span.chakra-switch__track': {
                transition: 'background-color 0.3s ease',
              },
              'span.chakra-switch__thumb': {
                transition: 'transform 0.2s ease',
              },
            }}
          />
        </MotionSwitchWrapper>
        <MotionBox
          animate={{
            scale: colorMode === 'dark' ? 1.2 : 0.9,
            opacity: colorMode === 'dark' ? 1 : 0.5,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <Icon
            as={MoonIcon}
            boxSize="24px"
            color={colorMode === 'dark' ? activeIconColor : inactiveIconColor}
            aria-hidden
          />
        </MotionBox>
      </HStack>
    </Flex>
  );
};


export default Navbar;
