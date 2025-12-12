import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/Signin.css";
import BG from "../assets/bg1.jpg";
import Loginnav from "../components/Loginnav";
import PizzaLeft from "../assets/hero.webp";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

const handleSignIn = () => {
  let redirectPath = "/Home"; // default path
  let userRole = "";

  if (username.trim() === "AdTherapist" && password === "cadcad") {
    userRole = "THERAPIST";
    redirectPath = "/AdminTherapist";
  } else if (username.trim() === "CMO" && password === "cadcad") {
    userRole = "CMO";
    redirectPath = "/CMO";
  } else if (username.trim() === "Patient1D" && password === "cadcad") {
    userRole = "PATIENT";
    redirectPath = "/Patients";
  } else if (username.trim() === "HOD" && password === "cadcad") {
    userRole = "HOD";
    redirectPath = "/HOD";
  } else if (username.trim() === "D01Neurophysics" && password === "cadcad") {
    userRole = "DOCTOR";
    redirectPath = "/Doctor";
  } 
  else if (username.trim() === "SystemAdmin" && password === "cadcad") {
    userRole = "DOCTOR";
    redirectPath = "/Doctor";
  } else {
    alert("Username or password is incorrect.");
    return;
  }

  // Store login info for later use
  localStorage.setItem("username", username.trim());
  localStorage.setItem("userRole", userRole);

  history.push(redirectPath);
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
            <div style={{backgroundColor:"#3A3FAD"}}>
            <h2 style={{color:"#fff",marginLeft:"20px",lineHeight:"2em"}}className="auth-title">LOGIN</h2></div>
            <form onSubmit={(e) => e.preventDefault()} className="auth-form">
              <label htmlFor="username" className="auth-label">
                User Name
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="auth-input"
                placeholder="Enter your username"
              />

              <label htmlFor="password" className="auth-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                placeholder="Enter your password"
              />

              <div className="auth-actions">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleSignIn}
                >
                  Sign In
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
