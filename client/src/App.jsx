import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import ViewPost from './pages/ViewPost';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/new" element={<CreatePost />} />
        <Route path="/posts/:id" element={<ViewPost />} />
      </Routes>
    </Router>
  );
}

export default App;
