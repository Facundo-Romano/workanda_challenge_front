import axios from 'axios';
import getTokenCookie from '@/functions/cookies/getTokenCookie.js';

const customAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

customAxios.interceptors.request.use((config) => {
  config.headers['Cookie'] = getTokenCookie();
  return config;
});

export default customAxios;