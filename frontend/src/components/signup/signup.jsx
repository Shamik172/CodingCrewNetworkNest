import React from "react";
import { Link } from "react-router-dom";
import styles from "./signup.module.css";

function Signup() {
  return (
    <div className={styles.signup_container}>
      <div className={styles.background_overlay}></div> {/* Dark overlay */}
      <div className={styles.signup_box}>
        <img src="/src/assets/loginbox3bg.png" alt="Avengers Logo" className={styles.logo} />
        <h2 className={styles.header}>Join the Avengers!</h2>
        <form>
          <div className={styles.input_group}>
            <label className={styles.label}>Username</label>
            <input type="text" placeholder="Enter your username" className={styles.input} />
          </div>
          <div className={styles.input_group}>
            <label className={styles.label}>Email</label>
            <input type="email" placeholder="Enter your email" className={styles.input} />
          </div>
          <div className={styles.input_group}>
            <label className={styles.label}>Password</label>
            <input type="password" placeholder="Enter your password" className={styles.input} />
          </div>
          <button className={styles.signup_button} type="submit">
            Sign Up
          </button>
        </form>
        <p className={styles.already_member}>
          Already part of the Avengers? <Link to="/login" className={styles.login_link}>Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
