import { motion } from 'framer-motion';
import { Box, Image, Badge, Text, Stack, Icon, Button } from '@chakra-ui/react';
import { FaDownload, FaStar, FaRegClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ app }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        bg="white"
        w="100%"
      >
        <Image 
          src={app.icon} 
          alt={app.title} 
          height={{ base: "150px", md: "200px" }} 
          width="100%" 
          objectFit="cover" 
        />

        <Box p={{ base: 3, md: 6 }}>
          <Stack 
            direction={{ base: "column", sm: "row" }} 
            alignItems="baseline"
            spacing={{ base: 2, md: 0 }}
          >
            <Badge borderRadius="full" px="2" colorScheme="teal">
              {app.genre}
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize={{ base: "2xs", md: "xs" }}
              textTransform="uppercase"
              ml={{ base: 0, sm: 2 }}
            >
              {app.free ? 'Free' : 'Paid'} &bull; {app.androidVersionText}
            </Box>
          </Stack>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {app.title}
          </Box>

          <Stack 
            direction={{ base: "column", sm: "row" }} 
            mt={2} 
            spacing={{ base: 2, md: 4 }}
            fontSize={{ base: "sm", md: "md" }}
          >
            <Text display="flex" alignItems="center">
              <Icon as={FaDownload} mr={1} />
              {app.installs}
            </Text>
            <Text display="flex" alignItems="center">
              <Icon as={FaStar} mr={1} />
              {app.scoreText}
            </Text>
            <Text display="flex" alignItems="center">
              <Icon as={FaRegClock} mr={1} />
              {app.updated ? new Date(app.updated).toLocaleDateString() : 'N/A'}
            </Text>
          </Stack>

          <Button
            colorScheme="blue"
            width="full"
            mt={4}
            onClick={() => navigate(`/app/${app.appId}`)}
          >
            View App
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
};

export default PostCard;
