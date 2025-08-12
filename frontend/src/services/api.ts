import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      try {
        // mark expired session to show UI notice
        localStorage.setItem('sessionExpired', '1');
        localStorage.removeItem('token');
      } catch {}
      // Redirect to login if available in hash router
      if (typeof window !== 'undefined') {
        window.location.hash = '#/login';
      }
    }
    const config = error?.config || {};
    // one-time retry for transient auth errors (dev rotations, race conditions)
    if ((status === 401 || status === 403) && !config._retry) {
      config._retry = true;
      const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
        return axios.request(config);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
