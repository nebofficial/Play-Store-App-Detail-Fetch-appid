import { useState, useEffect } from 'react';
import { Box, Input, VStack, HStack, Select, Text, Grid, Stack, Spinner, Center, Icon, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import PostCard from '../components/PostCard';
import { Outlet } from 'react-router-dom';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const Posts = () => {
  const [apps, setApps] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sort: 'newest'
  });

  useEffect(() => {
    const fetchApps = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/getApps', {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch apps');
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format');
        }

        const data = await response.json();
        setApps(data);
        setFilteredApps(data);
      } catch (error) {
        console.error('Error fetching apps:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApps();
  }, []);

  useEffect(() => {
    let result = [...apps];

    // Apply search filter
    if (filters.search) {
      result = result.filter(app => 
        app.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter(app => 
        app.genreId === filters.category || app.genre === filters.category
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (filters.sort) {
        case 'newest':
          return new Date(b.updated) - new Date(a.updated);
        case 'rating':
          return b.score - a.score;
        case 'downloads':
          return b.minInstalls - a.minInstalls;
        default:
          return 0;
      }
    });
    
    setFilteredApps(result);
  }, [filters, apps]);

  return (
    <Box p={{ base: 2, md: 8 }}>
      <VStack spacing={6} mb={8}>
        <Stack 
          direction={{ base: 'column', md: 'row' }} 
          spacing={4} 
          w="full"
        >
          <Input
            placeholder="Search apps..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            size={{ base: "md", md: "lg" }}
          />
          <Select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            size={{ base: "md", md: "lg" }}
          >
            <option value="">All Categories</option>
            <option value="GAME_RACING">Racing</option>
            <option value="GAME_STRATEGY">Strategy</option>
            <option value="GAME_CASUAL">Casual</option>
            <option value="GAME_ACTION">Action</option>
            <option value="GAME_SIMULATION">Simulation</option>
            <option value="SOCIAL">Social</option>
            <option value="PRODUCTIVITY">Productivity</option>
            <option value="FINANCE">Finance</option>
          </Select>
          <Select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            size={{ base: "md", md: "lg" }}
          >
            <option value="newest">Newest First</option>
            <option value="rating">Highest Rated</option>
            <option value="downloads">Most Downloads</option>
          </Select>
        </Stack>
      </VStack>

      {isLoading ? (
        <Center py={10}>
          <Spinner size="xl" color="blue.500" />
        </Center>
      ) : error ? (
        <Center py={10}>
          <Text color="red.500">Error: {error}</Text>
        </Center>
      ) : filteredApps.length === 0 ? (
        <Text textAlign="center">No apps found. Try adding some apps first!</Text>
      ) : (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)"
          }}
          gap={{ base: 3, md: 6 }}
        >
          {filteredApps.map((app, index) => (
            <motion.div
              key={app.appId + index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PostCard app={app} />
            </motion.div>
          ))}
        </Grid>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box
          as="footer"
          mt={8}
          py={{ base: 6, md: 8 }}
          px={{ base: 4, md: 6, lg: 8 }}
          borderTop="1px"
          borderColor="gray.200"
          bg="gray.50"
        >
          <Grid
            templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
            gap={{ base: 8, md: 12 }}
            maxW="7xl"
            mx="auto"
          >
            {/* Company Column */}
            <VStack align={{ base: "center", sm: "start" }} spacing={4}>
              <Heading size={{ base: "sm", md: "md" }} color="blue.600">Company</Heading>
              <VStack align={{ base: "center", sm: "start" }} spacing={3}>
                <Text 
                  fontSize={{ base: "sm", md: "md" }}
                  cursor="pointer" 
                  _hover={{ color: "blue.500" }}
                >
                  About Us
                </Text>
                <Text 
                  fontSize={{ base: "sm", md: "md" }}
                  cursor="pointer" 
                  _hover={{ color: "blue.500" }}
                >
                  Features
                </Text>
                <Text 
                  fontSize={{ base: "sm", md: "md" }}
                  cursor="pointer" 
                  _hover={{ color: "blue.500" }}
                >
                  Pricing
                </Text>
                <Text 
                  fontSize={{ base: "sm", md: "md" }}
                  cursor="pointer" 
                  _hover={{ color: "blue.500" }}
                >
                  Career
                </Text>
              </VStack>
            </VStack>

            {/* Resources Column */}
            <VStack align={{ base: "center", sm: "start" }} spacing={4}>
              <Heading size={{ base: "sm", md: "md" }} color="blue.600">Resources</Heading>
              <VStack align={{ base: "center", sm: "start" }} spacing={3}>
                <Text 
                  fontSize={{ base: "sm", md: "md" }}
                  cursor="pointer" 
                  _hover={{ color: "blue.500" }}
                >
                  Browse Apps
                </Text>
                <Text 
                  fontSize={{ base: "sm", md: "md" }}
                  cursor="pointer" 
                  _hover={{ color: "blue.500" }}
                >
                  Categories
                </Text>
                <Text 
                  fontSize={{ base: "sm", md: "md" }}
                  cursor="pointer" 
                  _hover={{ color: "blue.500" }}
                >
                  Top Charts
                </Text>
                <Text 
                  fontSize={{ base: "sm", md: "md" }}
                  cursor="pointer" 
                  _hover={{ color: "blue.500" }}
                >
                  New Releases
                </Text>
              </VStack>
            </VStack>

            {/* Contact Column */}
            <VStack align={{ base: "center", sm: "start" }} spacing={4}>
              <Heading size={{ base: "sm", md: "md" }} color="blue.600">Contact Us</Heading>
              <VStack align={{ base: "center", sm: "start" }} spacing={3}>
                <Text fontSize={{ base: "sm", md: "md" }}>support@appstore.com</Text>
                <Text fontSize={{ base: "sm", md: "md" }}>+1 (555) 123-4567</Text>
                <HStack spacing={6} pt={2}>
                  <motion.a whileHover={{ scale: 1.2 }} href="https://twitter.com" target="_blank">
                    <Icon as={FaTwitter} w={{ base: 4, md: 5 }} h={{ base: 4, md: 5 }} color="blue.400" />
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.2 }} href="https://github.com" target="_blank">
                    <Icon as={FaGithub} w={{ base: 4, md: 5 }} h={{ base: 4, md: 5 }} color="gray.600" />
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.2 }} href="https://linkedin.com" target="_blank">
                    <Icon as={FaLinkedin} w={{ base: 4, md: 5 }} h={{ base: 4, md: 5 }} color="blue.600" />
                  </motion.a>
                </HStack>
              </VStack>
            </VStack>
          </Grid>
          
          {/* Copyright Section */}
          <Box 
            pt={{ base: 6, md: 8 }} 
            mt={{ base: 6, md: 8 }} 
            borderTop="1px" 
            borderColor="gray.200"
          >
            <Text 
              fontSize={{ base: "xs", md: "sm" }} 
              color="gray.600"
              textAlign="center"
            >
              © 2024 App Store. All rights reserved.
            </Text>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Posts;
