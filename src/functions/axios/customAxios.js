import axios from 'axios';
import getTokenCookie from '@/functions/cookies/getTokenCookie.js';

const customAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getTokenCookie()}`
  },
});

export default customAxios;