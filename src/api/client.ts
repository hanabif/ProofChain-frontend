import axios from "axios";

export const api = axios.create({
  baseURL: "https://proofchain-api.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if using cookies
});

api.interceptors.request.use((config) => {
  // Do not attach the token to auth endpoints to prevent 401 on login with an expired token
  if (config.url && !config.url.startsWith('/auth/login') && !config.url.startsWith('/auth/register')) {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
  }
  return config;
});