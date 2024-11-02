import React from "react";
import { Link } from "react-router-dom";
import "./login.css";



function Login() {
  return (
    <div className="login-container">
      <div className="background-overlay"></div> {/* Dark overlay */}
      <div className="login-box">
        <img src="/src/assets/loginbox3bg.png" alt="Avengers Logo" className="logo"/>
        <h2>Welcome, Hero!</h2>
        <form>
          <div className="input-group">
            <label>Username</label>
            <input type="text" placeholder="Enter your username" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <button className="login-button" type="submit">
            Assemble
          </button>
        </form>
        <p className="not-member">
          Not part of the Avengers yet? <Link to="/signup" className="signup-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
