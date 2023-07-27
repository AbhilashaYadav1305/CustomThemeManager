import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import withHandleChange from "./hoc/withHandleChange";

function App(props) {
  const { handleChange, theme } = props;

  const refCallback = (node) => {
    if (node) {
      // Check if the 'theme' object is defined and not empty
      if (theme) {
        // Loop through each property (element) in the 'theme' object
        Object.keys(theme).forEach((element) => {
          // Set the CSS property of the 'node' element with the corresponding value from the 'theme' object
          node.style.setProperty(element, theme[element], "important");

          // Check if the current element is 'background-color' or 'background'
          if (element === "background-color" || element === "background") {
            // Apply the same background mentioned in the 'theme' object to the body of the website
            document.body.style.background = theme[element];
          }
        });
      }
    }
  };

  return (
    <div ref={refCallback} className="main-section">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage handleChange={handleChange} />} />
          <Route
            path="/homePage"
            element={<HomePage handleChange={handleChange} theme={theme} />}
          />
          <Route
            path="/login"
            element={<LoginPage handleChange={handleChange} />}
          />
          <Route
            path="/signUp"
            element={<SignupPage handleChange={handleChange} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default withHandleChange(App);
