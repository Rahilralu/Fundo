import axios from 'axios';
import { getToken, setToken, clearToken, getRefreshFn } from './tokens.js';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const isExpired = error.response?.status === 401 &&
                      error.response?.data?.code === 'TOKEN_EXPIRED';

    if (!isExpired || original._retry) return Promise.reject(error);
    original._retry = true;

    try {
      const refresh = getRefreshFn();
      if (!refresh) throw new Error('No refresh function registered');
      
      const newToken = await refresh(); // ✅ shared promise, no duplicate calls
      original.headers.Authorization = `Bearer ${newToken}`;
      return api(original);
    } catch {
      clearToken();
      window.location.href = '/login';
      return Promise.reject(error);
    }
  }
);

export default api;
