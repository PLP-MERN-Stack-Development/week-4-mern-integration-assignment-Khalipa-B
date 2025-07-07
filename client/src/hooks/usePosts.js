import { useState, useEffect } from 'react';
import { getPosts } from '../api/postService';

export default function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPosts()
      .then((res) => setPosts(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}
