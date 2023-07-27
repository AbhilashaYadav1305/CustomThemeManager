// useAPI.js
import { useState, useCallback } from "react";
import axios from "axios";

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (url, method = "GET", data = null, headers = {}) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios({
          method,
          url,
          data,
          headers,
        });

        setIsLoading(false);
        return response.data;
      } catch (err) {
        setIsLoading(false);
        setError(err.response.data.message || "Something went wrong!");
        throw err;
      }
    },
    []
  );

  return { isLoading, error, sendRequest };
};

export default useApi;
