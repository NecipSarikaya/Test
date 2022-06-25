import { useState, useCallback } from "react";
import axios from "axios";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (url, silent, handleData) => {
    if (!silent) {
      setIsLoading(true);
    }
    setError(null);
    try {
      const apiResult = await axios.get(url);
      handleData(apiResult.data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    if (!silent) {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
