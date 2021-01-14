import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import Login from "./Login";

import { processPasswordStrength } from "./Login.pure";

const EnhanceLogin = props => {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("test");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [styleProgressBar, setStyleProgressBar] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const formHandler = e => {
    e.preventDefault();
    if (email === "john@axa.fr" && password === "password") {
      history.push("/dashboard");
    } else {
      setErrorMessage("Les identifiants saisis sont incorrects");
    }
  };

  useEffect(() => {
    const passwordStrengthValue = processPasswordStrength(password);
    setPasswordStrength(passwordStrengthValue);
    setStyleProgressBar({
      width: `${passwordStrengthValue * 20}%`,
      backgroundColor: `
        rgb(
          ${(255 / 5) * (5 - passwordStrengthValue)},
          ${(255 / 5) * passwordStrengthValue},
          ${0}
        )`
    });
  }, [password]);

  return (
    <Login
      {...props}
      email={email}
      password={password}
      setPassword={setPassword}
      setEmail={setEmail}
      passwordStrength={passwordStrength}
      styleProgressBar={styleProgressBar}
      formHandler={formHandler}
      errorMessage={errorMessage}
    />
  );
};

export default EnhanceLogin;
