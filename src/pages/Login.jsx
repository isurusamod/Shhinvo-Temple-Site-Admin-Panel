"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission refresh
    setError("");
    setIsLoading(true);

    try {
      const API_URL = process.env.REACT_APP_API_URL || "/api";
      const response = await axios.post(`${API_URL}/login`, {
        username: "ravin",
        password,
      });

      if (response.data.success) {
        localStorage.setItem("jwtToken", response.data.token); // Store token if provided
        navigate("/home");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Full Axios Error:", err);
      if (err.response) {
        console.error("Server Response Data:", err.response.data);
        console.error("Server Status:", err.response.status);
        setError(
          err.response.data.message ||
            `Server Error: ${err.response.status}. Contact backend team to verify /api/login endpoint.`
        );
      } else if (err.request) {
        console.error("No Response:", err.request);
        setError(
          "No response from server. Ensure backend is running at https://temple-backend-one.vercel.app/api/login and CORS is configured."
        );
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const styles = {
    container: { minHeight: "100%" },
    backgroundImage: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: "url('/temple-background.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    content: {
      position: "relative",
      zIndex: 10,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
    },
    logo: {
      height: "100px",
      objectFit: "contain",
      marginBottom: "1.5rem",
      marginTop: "-2px",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },
    separator: {
      width: "100%",
      maxWidth: "80rem",
      height: "2px",
      backgroundColor: "rgba(211, 164, 12, 0.6)",
      marginBottom: "2rem",
    },
    welcomeSection: {
      textAlign: "center",
      marginBottom: "2rem",
      maxWidth: "90%",
    },
    errorBox: {
      position: "fixed",
      top: "20px",
      right: "20px",
      //   backgroundColor: "rgba(255, 0, 0, 0.8)",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "4px",
      zIndex: 9999,
      fontWeight: "bold",
      maxWidth: "300px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    },
    inputError: {
      border: "2px solid red",
    },
    welcomeTitle: {
      fontSize: "2.25rem",
      fontWeight: "300",
      color: "white",
      marginBottom: "0.5rem",
    },
    welcomeText: {
      color: "rgba(255, 255, 255, 0.9)",
      fontSize: "1.0rem",
      lineHeight: "1.5",
    },
    form: { width: "100%", maxWidth: "24rem" },
    inputGroup: { marginBottom: "1.25rem" },
    label: {
      display: "block",
      color: "white",
      fontSize: "0.99rem",
      fontWeight: "500",
      marginBottom: "0.5rem",
    },
    inputContainer: { position: "relative" },
    input: {
      width: "90%",
      height: "30px", // Added height
      padding: "0.625rem 1rem",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "0.375rem",
      color: "blue",
      fontSize: "0.875rem",
      fontWeight: "bold",
      outline: "none",
    },
    showButton: {
      position: "absolute",
      right: "0.75rem",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#2563eb",
      fontSize: "0.75rem",
      fontWeight: "500",
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
    },
    loginButton: {
      width: "20%",
      backgroundColor: "rgba(255, 192, 203, 0.93)",
      color: "black",
      fontWeight: "500",
      padding: "0.625rem 1rem",
      borderRadius: "0.375rem",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      cursor: "pointer",
      fontSize: "0.875rem",
      transition: "all 0.2s",
    },
    loadingButton: {
      width: "25%",
      backgroundColor: "rgba(255, 255, 255, 0.4)",
      color: "black",
      fontWeight: "500",
      padding: "0.625rem 1rem",
      borderRadius: "0.375rem",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      cursor: "not-allowed",
      fontSize: "0.875rem",
    },
  };

  const mediaQueries = `
    @media (min-width: 640px) {
      .content { padding: 1.5rem; }
      .logo { height: 850px; }
      .welcome-title { font-size: 1.5rem; }
      .welcome-text { font-size: 1rem; }
      .form { max-width: 28rem; }
      .input { font-size: 1rem; padding: 0.75rem 1rem; }
      .login-button { font-size: 1rem; padding: 0.75rem 1.5rem; }
    }
    @media (min-width: 768px) {
      .logo { height: 96px; }
      .welcome-title { font-size: 1.75rem; }
      .welcome-text { font-size: 1.125rem; }
      .separator { margin-bottom: 3rem; }
    }
    @media (min-width: 1024px) {
      .welcome-title { font-size: 3rem; }
      .welcome-section { max-width: 32rem; }
    }
  `;

  return (
    <>
      <style>{mediaQueries}</style>
      <div style={styles.container}>
        <div style={styles.backgroundImage} />
        <div style={styles.overlay} />
        <div style={styles.content}>
          <img src="/logo.png" alt="Shinnyo Logo" style={styles.logo} />
          <div style={styles.separator} />
          <div style={styles.welcomeSection}>
            <h4 style={styles.welcomeTitle} className="welcome-title">
              Welcome to Temple Office Online
            </h4>
            <p style={styles.welcomeText} className="welcome-text">
              Please login to browse and submit prayer request forms,
              <br />
              make offerings and deal with other administrative matters online.
            </p>
          </div>

          <form onSubmit={handleLogin} style={styles.form}>
            {error && <p style={styles.error}>{error}</p>}
            <div style={styles.errorBox}>{error}</div>
            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <div style={styles.inputContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  placeholder="***********"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={styles.showButton}
                >
                  {showPassword ? (
                    <svg
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "4px",
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "4px",
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={isLoading ? styles.loadingButton : styles.loginButton}
              className="login-button"
              disabled={isLoading}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
                  e.target.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                  e.target.style.transform = "scale(1)";
                }
              }}
            >
              {isLoading ? "LOGGIN" : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
