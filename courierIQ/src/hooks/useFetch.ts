import { useState, useRef, useEffect } from "react";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [data, setData] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  async function simulateLogin() {
    try { 
      setLoading(true);
      setIsError(false);
      setErrMessage("");

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await import("../api/json/user.json");
      setData(response.data);
      setIsSuccess(response.success); 
      setSuccessMessage(response.message);

    } catch(err) {
      setIsError(true);
      setErrMessage('Failed to Login');

    } finally {
      setLoading(false);
    }
  } // <-- simulateLogin ends here!

  // Now we return everything from the hook itself!
  return { loading, isError, errMessage, data, isSuccess, successMessage, simulateLogin };
};