import axios from "axios";
import { useAuthStore } from "../store/authStore";

// Public instance (no authorization header)
export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Authenticated instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  
  // Attach token if present and it's not a login/register request
  if (token && config.headers && !config.url?.includes('/auth/')) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  
  return config;
});