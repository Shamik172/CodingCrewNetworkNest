import React from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.css";

function Login() {
  return (
    <div className={styles.login_container}>
      <div className={styles.background_overlay}></div> {/* Dark overlay */}
      <div className={styles.login_box}>
        <img src="/src/assets/loginbox3bg.png" alt="Avengers Logo" className={styles.logo} />
        <h2 className={styles.header}>Welcome, Hero!</h2>
        <form action="/">
          <div className={styles.input_group}>
            <label className={styles.label}>Username</label>
            <input type="text" placeholder="Enter your username" className={styles.input} />
          </div>
          <div className={styles.input_group}>
            <label className={styles.label}>Password</label>
            <input type="password" placeholder="Enter your password" className={styles.input} />
          </div>
          <button className={styles.login_button} type="submit">
            Assemble
          </button>
        </form>
        <p className={styles.not_member}>
          Not part of the Avengers yet? <Link to="/signup" className={styles.signup_link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
