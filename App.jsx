import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Post from './pages/Post';
import SinglePost from './pages/SinglePost';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/posts" element={<Post />} />
          <Route path="/post/:id" element={<SinglePost />} />
          {/* Your other components and routes go here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
