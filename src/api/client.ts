import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // if using cookies
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  // Attach token if present and it's not a login/register request
  if (token && config.headers && !config.url?.includes('/auth/')) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  
  return config;
});