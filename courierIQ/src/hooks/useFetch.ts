// import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
// import { jsx } from "react/jsx-runtime";

interface userLoginDetails {
  email: string;
  password: string;
}

interface userSignUpDetails {
  name: string;
  email: string;
  password: string;
}

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [data, setData] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  async function simulateSignUp(userData: userSignUpDetails) {
    try {
      setLoading(true);
      setIsError(false);
      setErrMessage("");

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setData(userData);

      const currentUsers = localStorage.getItem("registeredUsers");

      const userArray = currentUsers ? JSON.parse(currentUsers) : [];

      userArray.push(userData);
      localStorage.setItem("registeredUsers", JSON.stringify(userArray));

      setIsSuccess(true);
      setSuccessMessage("Account Created Successfully 🥂");
    } catch (err) {
      setIsError(true);
      setErrMessage(err);
    } finally {
      setLoading(false);
    }
  }

  async function simulateLogin(userInput: userLoginDetails) {
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
        setData(response.data);
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
    simulateSignUp,
  };
};
