import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import useCookies from "../hooks/useCookies";

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { handleChange } = props;

  const navigate = useNavigate();
  const { sendRequest } = useApi();
  const { setCookieToken, getCookieValue } = useCookies("token", "");

  if (getCookieValue()) navigate("/homePage");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = {
      email: email,
      password: password,
    };

    try {
      const response = await sendRequest("/login", "POST", user);
      setCookieToken(response.token, response.expiresIn);
      handleChange({ label: response.theme });
      navigate("/homePage");
    } catch (error) {
      if (error && error.response && error.response.status) {
        setError("Please create an account!");
      }
      console.error(error);
    }
  };

  return (
    <div className="login-form">
      <div className="form-submit">
        <h2 className="login-header">Custom Theme Manager</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label>Email:</label>
            <input
              id="Email"
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <label>Password:</label>
            <input
              id="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button id="SubmitBtn" type="submit" className="loginBtn">
            Login
          </button>
          {error.length > 0 ? <p style={{ color: "red" }}>{error}</p> : null}
        </form>
        <div id="SignUp" className="signup">
          Don't have an account? <Link to="/signUp">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
