import React from "react";
import "./signup.css";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="signup-container">
      <div className="background-overlay"></div> {/* Dark overlay */}
      <div className="signup-box">
        <img src="/src/assets/loginbox3bg.png" alt="Avengers Logo" className="logo"/>
        <h2>Join the Avengers!</h2>
        <form>
          <div className="input-group">
            <label>Username</label>
            <input type="text" placeholder="Enter your username" />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <button className="signup-button" type="submit">
            Sign Up
          </button>
        </form>
        <p className="already-member">
          Already part of the Avengers? <Link to="/login" className="login-link">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
