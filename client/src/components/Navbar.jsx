import { Link } from 'react-router-dom';

export default function Navbar() {
  const token = localStorage.getItem('token');

  return (
    <nav>
      <Link to="/">Home</Link> |{' '}
      {token ? <Link to="/posts/new">New Post</Link> : <Link to="/login">Login</Link>}
    </nav>
  );
}
