import React, { useState } from "react";
import themes from "../Utils/theme";
import useCookies from "../hooks/useCookies";
import useApi from "../hooks/useApi";
import { REACT_APP_API_URL } from "../Utils/constants";
import useProfile from "../hooks/useProfile";

// Higher-Order Component (HOC) for handleChange
const withHandleChange = (WrappedComponent) => {
  const WithHandleChange = (props) => {
    const [theme, setTheme] = useState("");
    const { sendRequest } = useApi();
    const { getCookieValue } = useCookies("token", "");
    useProfile({ setTheme: setTheme });

    const apiUrl = REACT_APP_API_URL;

    const saveThemeInDB = async (selectedTheme) => {
      try {
        const userToken = getCookieValue();
        if (userToken) {
          await sendRequest(
            apiUrl + "/setTheme",
            "POST",
            { theme: selectedTheme },
            {
              authorization: `Bearer ${userToken}`,
            }
          );
        }
      } catch (err) {
        console.log(err);
      }
    };

    const handleChange = (selectedTheme, type = null) => {
      console.log(type);
      if (selectedTheme && selectedTheme.label) {
        setTheme(themes[selectedTheme.label]);
      } else {
        setTheme(themes.default);
      }
      if (type !== null) saveThemeInDB(selectedTheme.label);
    };

    return (
      <WrappedComponent
        handleChange={handleChange}
        theme={theme}
        setTheme={setTheme}
        {...props}
      />
    );
  };

  return WithHandleChange;
};

export default withHandleChange;
