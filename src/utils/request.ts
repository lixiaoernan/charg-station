// src/utils/request.ts
import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use((config) => {
  // 添加token等逻辑
  return config;
});

// 响应拦截器
service.interceptors.response.use((response) => {
  return response.data;
});

export default service;
