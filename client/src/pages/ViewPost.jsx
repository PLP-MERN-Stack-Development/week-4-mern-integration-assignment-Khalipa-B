import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/api';
import PostView from '../components/PostView';

export default function ViewPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    api
      .get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch(() => setError('Failed to fetch post'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return <PostView post={post} />;
}
