import { useEffect, useCallback } from "react";
import themes from "../Utils/theme";
import useApi from "../hooks/useApi";
import useCookies from "../hooks/useCookies";
import { REACT_APP_API_URL } from "../Utils/constants";

const useProfile = (params) => {
  const { sendRequest } = useApi();
  const { setTheme } = params;
  const { getCookieValue } = useCookies("token", "");
  const apiUrl = REACT_APP_API_URL;

  const getProfile = useCallback(async () => {
    try {
      const userToken = getCookieValue();
      const response = await sendRequest(
        apiUrl + `/userProfile`,
        "POST",
        null,
        {
          authorization: `Bearer ${userToken}`,
        }
      );
      setTheme(themes[response.theme]);
    } catch (err) {
      console.log(err);
    }
  }, [getCookieValue, sendRequest, apiUrl, setTheme]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return null;
};

export default useProfile;
