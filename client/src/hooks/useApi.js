import { useState, useCallback } from 'react';
import api from '../api/api';

export default function useApi(initialPath = '') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (method, path = initialPath, body) => {
      setLoading(true);
      try {
        const res = await api({ method, url: path, data: body });
        setData(res.data);
        return res.data;
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [initialPath]
  );

  return { data, loading, error, request };
}
