// useAPI.js
import { useState, useCallback } from "react";
import axios from "axios";
import { REACT_APP_API_URL } from "../Utils/helper";

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = REACT_APP_API_URL;

  const sendRequest = useCallback(
    async (path, method = "GET", data = null, headers = {}) => {
      const url = `${apiUrl}${path}`;
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
        setError(err.response.data?.message || "Something went wrong!");
        throw err;
      }
    },
    [apiUrl]
  );

  return { isLoading, error, sendRequest };
};

export default useApi;
