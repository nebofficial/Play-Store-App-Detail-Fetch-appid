import { Box, Flex, Button, Heading, IconButton, Stack, useDisclosure } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box bg="blue.500" px={4} py={3}>
      <Flex maxW="container.xl" mx="auto" justify="space-between" align="center">
        <Heading as={RouterLink} to="/" size="lg" color="white">
          PlayStore Apps
        </Heading>
        
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onToggle}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          color="white"
          aria-label="Toggle Navigation"
        />

        <Flex display={{ base: 'none', md: 'flex' }} gap={4}>
          <Button as={RouterLink} to="/posts" colorScheme="whiteAlpha">
            Browse Apps
          </Button>
          <Button as={RouterLink} to="/create" colorScheme="whiteAlpha">
            Add App (URL)
          </Button>
          <Button as={RouterLink} to="/manual-add" colorScheme="whiteAlpha">
            Add App (Manual)
          </Button>
        </Flex>
      </Flex>

      {/* Mobile menu */}
      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'none' }}
        py={4}
      >
        <Stack spacing={4}>
          <Button as={RouterLink} to="/posts" w="full" colorScheme="whiteAlpha">
            Browse Apps
          </Button>
          <Button as={RouterLink} to="/create" w="full" colorScheme="whiteAlpha">
            Add App (URL)
          </Button>
          <Button as={RouterLink} to="/manual-add" w="full" colorScheme="whiteAlpha">
            Add App (Manual)
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Navbar;
