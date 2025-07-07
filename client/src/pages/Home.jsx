import { useContext, useState, useEffect } from 'react';
import PostList from '../components/PostList';
import { AppContext } from '../context/AppContext';

export default function Home() {
  const { posts } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulate loading (remove if using context API fetch)
    if (posts.length) setLoading(false);
  }, [posts]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Blog Posts</h2>
      <PostList posts={posts} />
    </div>
  );
}
