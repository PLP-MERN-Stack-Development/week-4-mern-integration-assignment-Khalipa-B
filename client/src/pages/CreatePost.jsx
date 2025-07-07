import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import PostForm from '../components/PostForm';
import { AppContext } from '../context/AppContext';

export default function CreatePost() {
  const navigate = useNavigate();
  const { setPosts } = useContext(AppContext);

  const onSubmit = async (data) => {
    // Create a temporary ID (not ideal, but for optimistic update)
    const tempId = Date.now().toString();

    // Create a temporary post object for immediate UI update
    const tempPost = { ...data, _id: tempId, author: { name: 'You' }, category: { name: 'Loading...' } };

    // Optimistically update UI immediately
    setPosts((prev) => [tempPost, ...prev]);

    try {
      const res = await api.post('/posts', data);
      // Replace temporary post with real post from server
      setPosts((prev) => [res.data, ...prev.filter((p) => p._id !== tempId)]);
      navigate('/');
    } catch (err) {
      // Remove the temporary post on error
      setPosts((prev) => prev.filter((p) => p._id !== tempId));
      alert('Failed to create post');
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <PostForm onSubmit={onSubmit} />
    </div>
  );
}
