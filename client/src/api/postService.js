import http from './http';

export const getPosts   = () => http.get('/posts');
export const getPost    = (id) => http.get(`/posts/${id}`);
export const createPost = (data) => http.post('/posts', data);   // FormData for image
/* updatePost, deletePost */
