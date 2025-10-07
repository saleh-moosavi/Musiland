import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || error.message || "Request failed";

    switch (status) {
      case 400:
        console.warn("Bad request:", message);
        break;
      case 401:
        console.warn("Unauthorized:", message);
        break;
      case 404:
        console.warn("Not found:", message);
        break;
      case 500:
        console.error("Server error:", message);
        break;
      default:
        console.error("Unexpected error:", message);
    }

    return Promise.reject(new Error(message));
  }
);

export default apiClient;
