import axios, { AxiosResponse } from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ✅ Request Interceptor
apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor (Global Error Handler)
apiClient.interceptors.response.use((response: AxiosResponse) => response);

export default apiClient;
