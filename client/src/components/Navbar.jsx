import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
      <Link to="/">Home</Link>{' '}
      {token && (
        <>
          | <Link to="/posts/new">New Post</Link>{' '}
          | <button onClick={handleLogout}>Logout</button>
        </>
      )}
      {!token && (
        <>
          | <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
}
