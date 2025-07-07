import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../api/api';

// Validation schema
const schema = yup.object({
  title: yup.string().required().max(100),
  content: yup.string().required().min(50),
  category: yup.string().required(),
  excerpt: yup.string().max(200).optional(),
});

export default function PostForm({ onSubmit, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 600 }}>
      <label>Title</label>
      <input {...register('title')} />
      {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}

      <label>Content</label>
      <textarea {...register('content')} rows={6} />
      {errors.content && <p style={{ color: 'red' }}>{errors.content.message}</p>}

      <label>Excerpt (optional)</label>
      <textarea {...register('excerpt')} rows={3} />
      {errors.excerpt && <p style={{ color: 'red' }}>{errors.excerpt.message}</p>}

      <label>Category</label>
      <select {...register('category')}>
        <option value="">-- select category --</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      {errors.category && <p style={{ color: 'red' }}>{errors.category.message}</p>}

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
