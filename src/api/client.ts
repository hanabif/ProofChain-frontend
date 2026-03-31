import axios from "axios";

// Public instance (no authorization header)
export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Authenticated instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  console.log(`[DEBUG Axios] 👉 Starting Request to ${config.baseURL}${config.url}`);
  
  // Attach token if present and it's not a login/register request
  if (token && config.headers && !config.url?.includes('/auth/')) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  
  console.log(`[DEBUG Axios] 👉 Headers attached:`, config.headers);
  console.log(`[DEBUG Axios] 👉 withCredentials enabled?`, config.withCredentials === true);

  return config;
});