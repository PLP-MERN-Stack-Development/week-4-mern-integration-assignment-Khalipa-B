import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/posts')
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load posts');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Blog Posts</h2>
      {posts.map(post => (
        <div key={post._id} style={{ borderBottom: '1px solid #ddd', marginBottom: '1rem' }}>
          <h3>{post.title}</h3>
          <p>{post.excerpt || post.content.substring(0, 150)}...</p>
          <Link to={`/posts/${post._id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
