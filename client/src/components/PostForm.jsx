import { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    content: '',
    category: '',
    author: '', // TEMP: hardcoded author for testing
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!post.title || !post.content || !post.category || !post.author) {
      setError('All fields are required');
      return;
    }

    api.post('/posts', post)
      .then(() => navigate('/'))
      .catch(() => setError('Failed to create post'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Post</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type="text"
        name="title"
        placeholder="Post Title"
        value={post.title}
        onChange={handleChange}
      />
      <br />
      <textarea
        name="content"
        placeholder="Post Content"
        value={post.content}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="category"
        placeholder="Category ID"
        value={post.category}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="author"
        placeholder="Author ID"
        value={post.author}
        onChange={handleChange}
      />
      <br />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;
