import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./signup.module.css";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    // console.log(formData)
    e.preventDefault();
    setError(""); // Clear any previous error message

    try {
      const response = await axios.post("http://localhost:3000/auth/signup", formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong")
      }
    }
  };

  function capitalizeFirstLetter(str) {
    if (!str) return str; // Return an empty string or undefined if the input is falsy
    return str.charAt(0).toUpperCase() + str.slice(1);
}

  return (
    <div className={styles.signup_container}>
      <div className={styles.background_overlay}></div>
      <div className={styles.signup_box}>
        <img src="/src/assets/loginbox3bg.png" alt="Avengers Logo" className={styles.logo} />
        <h2 className={styles.header}>Join the Avengers!</h2>
        <form onSubmit={handleSubmit}>
        <div className={styles.input_group}>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className={styles.input}
              value={capitalizeFirstLetter(formData.name)}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.input_group}>
            <label className={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className={styles.input}
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.input_group}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.input_group}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className={styles.input}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className={styles.signup_button} type="submit">
            Sign Up
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
        <p className={styles.already_member}>
          Already part of the Avengers? <Link to="/login" className={styles.login_link}>Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
