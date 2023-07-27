import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useApi from "../hooks/useApi";
import { REACT_APP_API_URL } from "../Utils/constants";
// import useCookies from "../hooks/useCookies"; // Import the custom useCookies hook

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { sendRequest } = useApi(); // Initialize the custom hook
  // const { setCookieToken } = useCookies("token", ""); // Use the useCookies hook to manage the token
  const apiUrl = REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = {
      email: email,
      password: password,
    };

    try {
      await sendRequest(apiUrl + "/signUp", "POST", user);
      // setCookieToken(response.token, response.expiresIn);

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-form">
      <div className="form-submit">
        <h1 className="login-header">Custom Theme Manager</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label>Email:</label>
            <input
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="loginBtn">
            Sign Up
          </button>
        </form>
        <div className="signup">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
