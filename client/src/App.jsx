import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ViewPost from './pages/ViewPost';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<ViewPost />} />
        <Route path="/posts/new" element={<CreatePost />} /> {/* Updated route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
