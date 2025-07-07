import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import api from '../api/api';

// 🚦 Yup schema (no author field)
const schema = yup.object({
  title: yup.string().required('Title is required').max(100),
  content: yup.string().required('Content is required').min(50),
  category: yup.string().required('Category is required'),
  excerpt: yup.string().max(200, 'Excerpt too long').optional(),
});

export default function PostForm() {
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      content: '',
      category: '',
      excerpt: '',
    },
  });

  // fetch categories once
  useEffect(() => {
    api.get('/categories').then((r) => setCats(r.data));
  }, []);

  const onSubmit = async (data) => {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => form.append(k, v));
    if (file) form.append('featuredImage', file);

    try {
      await api.post('/posts', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      reset(); navigate('/');
    } catch (err) {
      alert('Failed to create post');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 600 }}>
      <h2>Create New Post</h2>

      <label>Title</label>
      <input {...register('title')} />
      {errors.title && <p className="err">{errors.title.message}</p>}

      <label>Content</label>
      <textarea {...register('content')} rows={8} />
      {errors.content && <p className="err">{errors.content.message}</p>}

      <label>Excerpt (optional)</label>
      <textarea {...register('excerpt')} rows={3} />
      {errors.excerpt && <p className="err">{errors.excerpt.message}</p>}

      <label>Category</label>
      <select {...register('category')}>
        <option value="">-- choose --</option>
        {cats.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>
      {errors.category && <p className="err">{errors.category.message}</p>}

      <label>Featured Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : 'Create Post'}
      </button>

      <style jsx>{`
        form { display: flex; flex-direction: column; gap: 0.75rem; }
        .err { color: red; font-size: 0.85rem; margin: 0; }
        input, textarea, select { width: 100%; padding: 0.5rem; }
      `}</style>
    </form>
  );
}
