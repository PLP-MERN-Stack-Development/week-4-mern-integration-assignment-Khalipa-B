import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);

  // Load categories & posts on app load
 useEffect(() => {
  api.get('/categories')
    .then(res => setCategories(res.data))
    .catch(() => alert('Failed to load categories'));

  api.get('/posts')
    .then(res => setPosts(res.data))
    .catch(() => alert('Failed to load posts'));
}, []);

  // Check logged in user on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    // Here you may want to fetch user info from API, if you have /auth/me or similar endpoint
    // For now, we'll just set a dummy user object to indicate logged in
    setUser({ name: 'Logged In User' });
  }, []);

  const value = { posts, setPosts, categories, user, setUser };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}


