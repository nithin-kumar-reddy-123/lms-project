import axios from "axios";

const API = axios.create({
 baseURL: "https://lms-project-3x30.onrender.com/api"
});

// Add JWT token to request headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;