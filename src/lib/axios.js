import axios from "axios";

const api = axios.create({
  baseURL: "https://fmdapi1070.pythonanywhere.com",
});

// Attach Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // فقط اگر 401 واقعی از بک‌اند گرفتیم، نه زمان logout!
    if (error.response && error.response.status === 401) {
      console.warn("401 detected → user must re-login");
    }
    return Promise.reject(error);
  }
);

export default api;
