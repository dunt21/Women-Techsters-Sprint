import { useState } from "react";
import toast from "react-hot-toast";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [data, setData] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  async function simulateLogin(userInput) {
    try {
      setLoading(true);
      setIsError(false);
      setErrMessage("");

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await import("../api/json/user.json");

      if (
        userInput.email === response.data.user.email &&
        userInput.password === response.data.user.password
      ) {
        setData(response.data.user);
        setIsSuccess(response.success);
        setSuccessMessage(response.message);
      } else {
        throw new Error("Login credentials do not match");
      }
    } catch (err) {
      console.log("login failed");

      setIsError(true);
      setErrMessage(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    isError,
    errMessage,
    data,
    isSuccess,
    successMessage,
    simulateLogin,
  };
};
