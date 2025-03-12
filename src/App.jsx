import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Posts from '../pages/Posts';
import CreatePost from '../pages/CreatePost';
import SingleAppView from '../pages/SingleAppView';
import ManualAppForm from '../components/ManualAppForm';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/manual-add" element={<ManualAppForm />} />
          <Route path="/app/:appId" element={<SingleAppView />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
