import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "../styles/Signin.css";
import BG from "../assets/bg1.jpg";
import Loginnav from "../components/Loginnav";
import PizzaLeft from "../assets/hero.webp";
import { API_URL } from "../platform/config/api.config";
import api, { setAccessToken } from "../shared/api/apiClient";


const fetchUserProfile = async () => {
  try {
    const response = await api.get(API_URL.ME);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const history  = useHistory();
  const location = useLocation();

  // After login, go back to where they were trying to go (or /Doctor by default)
  const from = location.state?.from?.pathname || "/Doctor";

  const handleLogin = async () => {
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Please enter your username and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(API_URL.LOGIN, { username, password }, { withCredentials: true });
      setAccessToken(response.data);
    } catch (err) {
      if (!err.response) {
        setError("Cannot connect to the server. Please check your connection or try again later.");
      } else {
        setError(
          err.response?.data?.message?.[0]
          || err.response?.data?.detail
          || "Invalid username or password."
        );
      }
      setLoading(false);
      return;
    }

    const user = await fetchUserProfile();

    if (!user) {
      setError("Login succeeded but failed to load your profile. Please try again.");
      setLoading(false);
      return;
    }

    localStorage.setItem("user",     JSON.stringify(user));
    localStorage.setItem("username", user.username?.trim() || "");
    localStorage.setItem("userRole", user.user_type || "DOCTOR");
    setLoading(false);
    history.replace(from);   // redirect to intended page
  };

  const handleSignUp = () => {
    history.push("/Signup");
  };

  return (
    <div
      className="auth-bg"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Loginnav />
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-left">
            <div style={{ backgroundColor: "#3A3FAD" }}>
              <h2 style={{ color: "#fff", marginLeft: "20px", lineHeight: "2em" }} className="auth-title">
                LOGIN
              </h2>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="auth-form">
              <label htmlFor="username" className="auth-label">User Name</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="auth-input"
                placeholder="Enter your username"
              />

              <label htmlFor="password" className="auth-label">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="auth-input"
                placeholder="Enter your password"
              />

              <div className="auth-actions">
                {error && (
                  <div style={{
                    color: "#dc2626", background: "#fef2f2",
                    border: "1px solid #fecaca", borderRadius: 6,
                    padding: "8px 12px", fontSize: 13,
                    marginBottom: 8, width: "100%", boxSizing: "border-box"
                  }}>
                    {error}
                  </div>
                )}
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleLogin}
                  disabled={loading}
                  style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                >
                  {loading ? "Signing in…" : "Sign In"}
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>

          <div className="auth-right">
            <img src={PizzaLeft} alt="Healthcare" className="auth-hero" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
