// src/lib/api.js
import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // deja true si usas cookies de sesión
});

// Inyecta JWT si lo usas por header
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token'); // o tu UserContext
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Manejo global de 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      // Opcional: limpiar sesión/redirigir
      // sessionStorage.removeItem('token');
      // window.location.href = '/LogIn';
    }
    return Promise.reject(err);
  }
);

export default api;
