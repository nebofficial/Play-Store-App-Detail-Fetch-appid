import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Select,
  FormHelperText
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    appId: '',
    category: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const categories = [
    'Games',
    'Social',
    'Productivity',
    'Education',
    'Entertainment',
    'Finance'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate app ID format
      if (!formData.appId.match(/^[a-zA-Z0-9_.]+$/)) {
        throw new Error('Invalid App ID format');
      }

      // Check if app already exists
      const checkResponse = await fetch(`/api/checkApp/${formData.appId}`);
      if (!checkResponse.ok) throw new Error('Network response was not ok');
      const checkData = await checkResponse.json();

      if (checkData.exists) {
        toast({
          title: 'App already exists',
          description: 'This app has already been added to the database.',
          status: 'warning',
          duration: 3000
        });
        setIsLoading(false);
        return;
      }

      const response = await fetch(`/api/app/${formData.appId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      if (response.status === 409) {
        toast({
          title: 'App already exists',
          description: 'This app has already been added to the database.',
          status: 'warning',
          duration: 3000
        });
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch app data');

      toast({
        title: 'Success!',
        description: 'App has been added successfully.',
        status: 'success',
        duration: 3000
      });

      // Redirect to posts page
      navigate('/posts');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box maxW="xl" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>App ID</FormLabel>
              <Input
                value={formData.appId}
                onChange={(e) => setFormData({ ...formData, appId: e.target.value })}
                placeholder="com.example.app"
              />
              <FormHelperText>App ID must be alphanumeric and can include underscores and periods.</FormHelperText>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Select>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              w="full"
              mt={4}
              isLoading={isLoading}
            >
              Add App
            </Button>
          </VStack>
        </form>
      </Box>
    </motion.div>
  );
};

export default CreatePost;
