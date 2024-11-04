import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error message

    try {
      const response = await axios.post("http://localhost:5000/login", { username, password }, { withCredentials: true });
      
      // Redirect if login is successful
      if (response.status === 200) {
        navigate("/index"); // Adjust path as needed
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.background_overlay}></div>
      <div className={styles.login_box}>
        <img src="/src/assets/loginbox3bg.png" alt="Avengers Logo" className={styles.logo} />
        <h2 className={styles.header}>Welcome, Hero!</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.input_group}>
            <label className={styles.label}>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.input_group}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className={styles.login_button} type="submit">
            Assemble
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
        <p className={styles.not_member}>
          Not part of the Avengers yet? <Link to="/signup" className={styles.signup_link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
