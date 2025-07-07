import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import ViewPost from './pages/ViewPost';
import Login from './pages/Login';               // ← new

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/new" element={<CreatePost />} />
        <Route path="/posts/:id" element={<ViewPost />} />
        <Route path="/login" element={<Login />} />   {/* new route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
