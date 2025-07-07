export default function PostView({ post }) {
  if (!post) return <p>Loading post...</p>;

  return (
    <article>
      <h1>{post.title}</h1>
      <p>By {post.author?.name || 'Unknown'}</p>
      <p>Category: {post.category?.name || 'None'}</p>
      <img
        src={post.featuredImage ? `/uploads/${post.featuredImage}` : '/default-post.jpg'}
        alt={post.title}
        style={{ maxWidth: '100%' }}
      />
      <p>{post.content}</p>
    </article>
  );
}
