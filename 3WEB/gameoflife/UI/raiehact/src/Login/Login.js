import React from "react";
import "./Login.css";
import Header from "../layout/Header/Header";

const subtitle = "Login";

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  passwordStrength,
  styleProgressBar,
  formHandler,
  errorMessage
}) => (
  <>
    <Header subtitle={subtitle} />
    <div className="login">
      <form className="login" onSubmit={formHandler}>
        <label for="email">Login</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          className="login__email"
          placeholder="Email"
        />
        <label for="password">Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          id="password"
          type="password"
          className="login__password"
          placeholder="Password"
        />
        <h3>Password strength</h3>
        <progress
          className="password-strength__progress"
          max="5"
          value={passwordStrength}
        ></progress>
        <div className="password-strength__bar-container">
          <div className="password-strength__bar" style={styleProgressBar}>
            <span className="password-strength__value">{passwordStrength}</span>
          </div>
        </div>
        <h3 className="login__error">{errorMessage}</h3>
        <button className="login__button">Submit</button>
      </form>
    </div>
  </>
);

export default Login;
