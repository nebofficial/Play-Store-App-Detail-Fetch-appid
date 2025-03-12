import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, SimpleGrid, NumberInput, NumberInputField, Switch, useToast } from '@chakra-ui/react';
import { useState } from 'react';

const ManualAppForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    summary: '',
    installs: '',
    score: '',
    developer: '',
    developerEmail: '',
    developerWebsite: '',
    genre: '',
    icon: '',
    price: 0,
    androidVersion: '',
    minInstalls: 0,
    maxInstalls: 0,
    ratings: 0,
    reviews: 0,
    histogram: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    },
    free: true,
    currency: 'USD',
    priceText: 'Free',
    video: '',
    videoImage: '',
    previewVideo: '',
    contentRating: '',
    adSupported: false,
    released: '',
    updated: '',
    version: '',
    isAvailableInPlayPass: false,
    url: '',
    fetchedAt: new Date().toISOString()
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const appData = {
        ...formData,
        scoreText: formData.score.toString(),
        priceText: formData.free ? 'Free' : `$${formData.price}`,
        histogram: {
          1: parseInt(formData.histogram[1] || 0),
          2: parseInt(formData.histogram[2] || 0),
          3: parseInt(formData.histogram[3] || 0),
          4: parseInt(formData.histogram[4] || 0),
          5: parseInt(formData.histogram[5] || 0)
        },
        updated: Date.now(),
        fetchedAt: new Date().toISOString()
      };

      const response = await fetch('/api/manual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to save app data');
      }

      toast({
        title: "Success",
        description: "App data saved successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset form after successful submission
      setFormData({
        title: '',
        description: '',
        summary: '',
        installs: '',
        score: '',
        developer: '',
        developerEmail: '',
        developerWebsite: '',
        genre: '',
        icon: '',
        price: 0,
        androidVersion: '',
        minInstalls: 0,
        maxInstalls: 0,
        ratings: 0,
        reviews: 0,
        histogram: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0
        },
        free: true,
        currency: 'USD',
        priceText: 'Free',
        video: '',
        videoImage: '',
        previewVideo: '',
        contentRating: '',
        adSupported: false,
        released: '',
        updated: '',
        version: '',
        isAvailableInPlayPass: false,
        url: '',
        fetchedAt: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error saving app data:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save app data. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box maxW="900px" mx="auto" p={6}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
            <FormControl isRequired>
              <FormLabel>App Title</FormLabel>
              <Input name="title" value={formData.title} onChange={handleChange} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Genre</FormLabel>
              <Input name="genre" value={formData.genre} onChange={handleChange} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Developer</FormLabel>
              <Input name="developer" value={formData.developer} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>App ID</FormLabel>
              <Input name="appId" value={formData.appId} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Developer Email</FormLabel>
              <Input name="developerEmail" type="email" value={formData.developerEmail} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Developer Website</FormLabel>
              <Input name="developerWebsite" type="url" value={formData.developerWebsite} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Icon URL</FormLabel>
              <Input name="icon" type="url" value={formData.icon} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Minimum Android Version</FormLabel>
              <Input name="androidVersion" value={formData.androidVersion} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Score (0-5)</FormLabel>
              <NumberInput max={5} min={0} step={0.1}>
                <NumberInputField name="score" value={formData.score} onChange={handleChange} />
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Minimum Installs</FormLabel>
              <NumberInput min={0}>
                <NumberInputField name="minInstalls" value={formData.minInstalls} onChange={handleChange} />
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Maximum Installs</FormLabel>
              <NumberInput min={0}>
                <NumberInputField name="maxInstalls" value={formData.maxInstalls} onChange={handleChange} />
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Ratings Count</FormLabel>
              <NumberInput min={0}>
                <NumberInputField name="ratings" value={formData.ratings} onChange={handleChange} />
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Reviews Count</FormLabel>
              <NumberInput min={0}>
                <NumberInputField name="reviews" value={formData.reviews} onChange={handleChange} />
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Video URL</FormLabel>
              <Input name="video" type="url" value={formData.video} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Content Rating</FormLabel>
              <Input name="contentRating" value={formData.contentRating} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Release Date</FormLabel>
              <Input name="released" type="date" value={formData.released} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Version</FormLabel>
              <Input name="version" value={formData.version} onChange={handleChange} />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Ad Supported</FormLabel>
              <Switch name="adSupported" isChecked={formData.adSupported} onChange={(e) => handleChange({
                target: { name: 'adSupported', value: e.target.checked }
              })} />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Free App</FormLabel>
              <Switch name="free" isChecked={formData.free} onChange={(e) => handleChange({
                target: { name: 'free', value: e.target.checked }
              })} />
            </FormControl>
          </SimpleGrid>

          <FormControl isRequired>
            <FormLabel>Summary</FormLabel>
            <Textarea name="summary" value={formData.summary} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" value={formData.description} onChange={handleChange} rows={6} />
          </FormControl>

          <Button type="submit" colorScheme="blue" size="lg" w="full">
            Submit App
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ManualAppForm;
