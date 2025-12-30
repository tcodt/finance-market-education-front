import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: "https://fmdapi1070.pythonanywhere.com",
});

// Attach Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
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
      toast.error("کاربر گرامی، لطفا مجددا وارد شوید.");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    }
    return Promise.reject(error);
  }
);

export default api;
