import { Link } from 'react-router-dom';

export default function PostList({ posts }) {
  if (!posts.length) return <p>No posts available.</p>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <Link to={`/posts/${post._id}`}>
            <h3>{post.title}</h3>
          </Link>
          <p>{post.excerpt || post.content.substring(0, 100) + '...'}</p>
          <p>
            By {post.author?.name || 'Unknown'} | Category: {post.category?.name || 'None'}
          </p>
        </li>
      ))}
    </ul>
  );
}
