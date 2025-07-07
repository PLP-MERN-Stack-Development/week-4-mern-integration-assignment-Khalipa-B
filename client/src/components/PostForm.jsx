import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../api/api';

// 1️⃣ Yup validation schema
const schema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .max(100, 'Title can’t exceed 100 chars'),
  content: yup.string().required('Content is required').min(50, 'Content too short'),
  category: yup.string().required('Category ID is required'),
  author: yup.string().required('Author ID is required'),
  excerpt: yup.string().max(200, 'Excerpt can’t exceed 200 chars').optional(),
}).required();

export default function PostForm() {
  const navigate = useNavigate();

  // 2️⃣ react‑hook‑form setup
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
      author: '',
      excerpt: '',
    },
  });

  // 3️⃣ onSubmit handler
  const onSubmit = async (data) => {
    try {
      await api.post('/posts', data);
      reset();
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to create post');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '600px' }}>
      <h2>Create New Post</h2>

      <label>Title</label>
      <input {...register('title')} placeholder="Post Title" />
      {errors.title && <p className="err">{errors.title.message}</p>}

      <label>Content</label>
      <textarea {...register('content')} placeholder="Post Content" rows={8} />
      {errors.content && <p className="err">{errors.content.message}</p>}

      <label>Excerpt (optional)</label>
      <textarea {...register('excerpt')} rows={3} />
      {errors.excerpt && <p className="err">{errors.excerpt.message}</p>}

      <label>Category ID</label>
      <input {...register('category')} placeholder="Category Mongo ID" />
      {errors.category && <p className="err">{errors.category.message}</p>}

      <label>Author ID</label>
      <input {...register('author')} placeholder="Author Mongo ID" />
      {errors.author && <p className="err">{errors.author.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : 'Create Post'}
      </button>

      <style jsx>{`
        form { display: flex; flex-direction: column; gap: 0.75rem; }
        .err { color: red; margin: 0; font-size: 0.85rem; }
        input, textarea { width: 100%; padding: 0.5rem; }
        button { width: 130px; padding: 0.5rem; }
      `}</style>
    </form>
  );
}
