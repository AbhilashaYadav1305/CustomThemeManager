import { useCallback, useState } from "react";
import Cookies from "js-cookie";

const useCookies = (cookieName, initialValue) => {
  const [cookieValue, setCookieValue] = useState(() => {
    const cookie = Cookies.get(cookieName);
    return cookie ? cookie : initialValue;
  });

  const updateCookieValue = (value, duration = 7) => {
    setCookieValue(value);
    Cookies.set(cookieName, JSON.stringify(value), { expires: duration });
  };

  const removeCookie = () => {
    setCookieValue(initialValue);
    Cookies.remove(cookieName);
  };
  const getCookieValue = useCallback(() => {
    const cookie = Cookies.get(cookieName);
    return cookie ? cookie : initialValue;
  }, [cookieName, initialValue]);

  return {
    getCookieValue: getCookieValue,
    cookieValue,
    setCookieToken: updateCookieValue,
    removeCookieToken: removeCookie,
  };
};

export default useCookies;
