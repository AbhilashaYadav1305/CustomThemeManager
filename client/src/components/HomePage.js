import React from "react";
import Select from "react-select";
import theme from "../Utils/theme";
import LoginPage from "./LoginPage";
import { useNavigate } from "react-router-dom";
import About from "./About";
import useCookies from "../hooks/useCookies"; // Import the custom useCookies hook

const HomePage = (props) => {
  const { handleChange } = props;
  const navigate = useNavigate();
  const { removeCookieToken, getCookieValue } = useCookies("token", "");

  const selectOptions = React.useMemo(
    () =>
      Object.entries(theme).map(([key, value]) => ({
        value: value,
        label: key,
      })),
    []
  );

  const logout = () => {
    removeCookieToken("token");
    handleChange({ value: "" });
    navigate("/login");
  };

  if (!getCookieValue()) {
    return <LoginPage handleChange={handleChange} />;
  }

  return (
    <div className="content">
      <h1>Welcome to Custom Theme Manager</h1>
      <div className="theme-dropdown">
        <label>Select an option:</label>
        <Select
          className="select-filter"
          options={selectOptions}
          onChange={handleChange}
          value={selectOptions.find(
            (option) => option.value.name === props.theme.name
          )}
        />
      </div>
      <div>
        {getCookieValue() && (
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        )}
      </div>
      <br />
      <About theme={props.theme} />
    </div>
  );
};

export default HomePage;
