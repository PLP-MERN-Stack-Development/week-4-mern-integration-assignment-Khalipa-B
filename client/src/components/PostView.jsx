import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

const PostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(() => setError('Post not found'));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p><strong>Category:</strong> {post.category?.name || 'N/A'}</p>
      <p>{post.content}</p>
      <p><em>Views: {post.viewCount}</em></p>
    </div>
  );
};

export default PostView;
