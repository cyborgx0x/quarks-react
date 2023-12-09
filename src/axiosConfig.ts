import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_HOST_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access_token");

      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
