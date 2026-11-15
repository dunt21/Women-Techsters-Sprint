import axios from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 12000,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (!navigator.onLine)
      toast.error("You are offline. Please check your internet connection.", {
        id: "api-error",
      });
    else if (err.code === "ECONNABORTED")
      toast.error("Connection timed out. Please try again.", {
        id: "api-error",
      });
    else if (!err.response)
      toast.error("Network error. Unable to reach the server.", {
        id: "api-error",
      });

    return Promise.reject(err);
  },
);
