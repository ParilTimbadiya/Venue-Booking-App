import axios from 'axios';

export const publicApi = axios.create({
  baseURL: 'http://localhost:8023/crickhero'
});

export const privateApi = axios.create({
  baseURL: "http://localhost:8023/crickhero/auth/"
});

privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);