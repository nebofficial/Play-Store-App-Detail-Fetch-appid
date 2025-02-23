import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Image,
  Heading,
  Text,
  Grid,
  Badge,
  Button,
  VStack,
  HStack,
  Divider,
  useToast,
  SimpleGrid,
  Icon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaDownload, FaStar, FaAndroid, FaCalendar, FaFolder, FaDatabase, FaCodeBranch } from 'react-icons/fa';
import PostCard from '../components/PostCard';

const InfoBox = ({ label, value }) => (
  <Box p={{ base: 2, md: 3 }} bg="gray.50" borderRadius="md">
    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500">{label}</Text>
    <Text fontSize={{ base: "sm", md: "md" }} fontWeight="500" color="gray.700">{value}</Text>
  </Box>
);

const AttributeBox = ({ label, value, icon }) => (
  <Box 
    p={{ base: 3, md: 4 }} 
    bg="white" 
    borderRadius="lg"
    boxShadow="sm"
    border="1px"
    borderColor="gray.200"
    transition="all 0.3s"
    _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
  >
    <HStack spacing={{ base: 2, md: 3 }}>
      <Icon as={icon} boxSize={{ base: 4, md: 5 }} color="blue.500" />
      <VStack align="start" spacing={0}>
        <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="medium" color="gray.500">
          {label}
        </Text>
        <Text fontSize={{ base: "sm", md: "md" }} fontWeight="bold" color="gray.800">
          {value}
        </Text>
      </VStack>
    </HStack>
  </Box>
);

const SingleAppView = () => {
  const { appId } = useParams();
  const [app, setApp] = useState(null);
  const [relatedApps, setRelatedApps] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchAppDetails = async () => {
      try {
        // First try to get from existing apps
        const appsResponse = await fetch('/api/getApps');
        const allApps = await appsResponse.json();
        const existingApp = allApps.find(app => app.appId === appId);
        
        if (existingApp) {
          setApp(existingApp);
          // Filter related apps
          const related = allApps
            .filter(a => a.genreId === existingApp.genreId && a.appId !== appId)
            .slice(0, 4);
          setRelatedApps(related);
        } else {
          // If app not found in existing apps, fetch it
          const response = await fetch(`/api/app/${appId}`);
          if (!response.ok) throw new Error('Failed to fetch app details');
          const data = await response.json();
          setApp(data);
        }
      } catch (error) {
        toast({
          title: 'Error fetching app details',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    if (appId) {
      fetchAppDetails();
    }
  }, [appId, toast]);

  if (!app) return null;

  return (
    <Container maxW="container.xl" py={{ base: 4, md: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <Box bg="white" borderRadius="xl" overflow="hidden" boxShadow="xl" mb={{ base: 4, md: 8 }}>
          <Grid templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={{ base: 4, md: 6 }} p={{ base: 4, md: 6 }}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image 
                src={app.icon} 
                alt={app.title} 
                borderRadius="xl"
                width={{ base: "200px", md: "100%" }}
                mx={{ base: "auto", md: 0 }}
              />
            </motion.div>
            
            <VStack align="start" spacing={{ base: 3, md: 4 }}>
              <Heading size={{ base: "md", md: "lg" }}>{app.title}</Heading>
              <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>{app.developer}</Text>
              
              <HStack spacing={{ base: 2, md: 4 }} flexWrap="wrap">
                <Badge colorScheme="blue">{app.genre}</Badge>
                <Badge colorScheme="green">{app.free ? 'Free' : 'Paid'}</Badge>
                <Badge colorScheme="purple">{app.contentRating}</Badge>
              </HStack>
              
              <SimpleGrid columns={{ base: 3, md: 3 }} spacing={{ base: 4, md: 6 }} w="full">
                <VStack align="center">
                  <FaStar color="gold" />
                  <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>{app.scoreText}</Text>
                  <Text fontSize={{ base: "xs", md: "sm" }}>{app.ratings} ratings</Text>
                </VStack>
                
                <VStack align="center">
                  <FaDownload color="green" />
                  <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>{app.installs}</Text>
                  <Text fontSize={{ base: "xs", md: "sm" }}>Downloads</Text>
                </VStack>
                
                <VStack align="center">
                  <FaAndroid color="blue" />
                  <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>{app.androidVersionText}+</Text>
                  <Text fontSize={{ base: "xs", md: "sm" }}>Android</Text>
                </VStack>
              </SimpleGrid>

              <Button
                as="a"
                href={app.url}
                target="_blank"
                colorScheme="blue"
                leftIcon={<FaDownload />}
                size={{ base: "md", md: "lg" }}
                width={{ base: "full", md: "auto" }}
              >
                Download APK
              </Button>
            </VStack>
          </Grid>
        </Box>

        {/* Screenshots Section */}
        <Box bg="white" borderRadius="xl" p={{ base: 4, md: 6 }} mb={{ base: 4, md: 8 }}>
          <Heading size={{ base: "sm", md: "md" }} mb={{ base: 3, md: 4 }}>Screenshots</Heading>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={{ base: 2, md: 4 }}>
              {app.screenshots?.map((screenshot, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                    borderRadius="lg"
                    cursor="pointer"
                    onClick={() => window.open(screenshot, '_blank')}
                  />
                </motion.div>
              ))}
            </SimpleGrid>
          </motion.div>
        </Box>

        {/* Description Section */}
        <Box 
          bg="white" 
          borderRadius="xl" 
          p={{ base: 4, md: 8 }} 
          mb={{ base: 4, md: 8 }}
          boxShadow="lg"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading size={{ base: "md", md: "lg" }} mb={{ base: 4, md: 6 }} color="blue.600">
              About This App
            </Heading>
            
            <Grid 
              templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} 
              gap={{ base: 3, md: 4 }} 
              mb={{ base: 4, md: 6 }}
            >
              <AttributeBox 
                label="Category" 
                value={app.genre}
                icon={FaFolder}
              />
              <AttributeBox 
                label="Size" 
                value={app.size || 'N/A'}
                icon={FaDatabase}
              />
              <AttributeBox 
                label="Version" 
                value={app.version}
                icon={FaCodeBranch}
              />
              <AttributeBox 
                label="Updated" 
                value={new Date(app.updated).toLocaleDateString()}
                icon={FaCalendar}
              />
              <AttributeBox 
                label="Installs" 
                value={app.installs}
                icon={FaDownload}
              />
              <AttributeBox 
                label="Requires Android" 
                value={`${app.androidVersionText}+`}
                icon={FaAndroid}
              />
            </Grid>
            
            <VStack align="start" spacing={{ base: 4, md: 6 }}>
              {app.summary && (
                <Text
                  fontSize="xl"
                  fontWeight="600"
                  color="blue.700"
                  fontStyle="italic"
                  bg="blue.50"
                  p={4}
                  borderRadius="md"
                  w="full"
                >
                  {app.summary}
                </Text>
              )}
              
              <Box>
                <Heading size="md" mb={3} color="gray.700">
                  Description
                </Heading>
                <Text
                  whiteSpace="pre-line"
                  color="gray.600"
                  fontSize="md"
                  lineHeight="tall"
                  sx={{
                    'p': { mb: 4 },
                    'ul': { pl: 6, mb: 4 },
                    'li': { mb: 2 },
                    'strong': { color: 'blue.600', fontWeight: 'bold' }
                  }}
                >
                  {app.description}
                </Text>
              </Box>

              {app.recentChanges && (
                <Box 
                  w="full" 
                  bg="green.50" 
                  p={6} 
                  borderRadius="lg"
                  border="1px"
                  borderColor="green.200"
                >
                  <Heading size="md" mb={4} color="green.600">
                    What's New
                  </Heading>
                  <Text
                    whiteSpace="pre-line"
                    color="gray.700"
                    dangerouslySetInnerHTML={{ __html: app.recentChanges }}
                  />
                </Box>
              )}
            </VStack>
          </motion.div>
        </Box>

        {/* Related Apps Section */}
        {relatedApps.length > 0 && (
          <Box>
            <Heading size={{ base: "sm", md: "md" }} mb={{ base: 3, md: 4 }}>Related Apps</Heading>  
            <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={{ base: 4, md: 6 }}>
              {relatedApps.map((relatedApp) => (
                <PostCard key={relatedApp.appId} app={relatedApp} />
              ))}
            </SimpleGrid>
          </Box>
        )}
      </motion.div>
    </Container>
  );
};

export default SingleAppView;
