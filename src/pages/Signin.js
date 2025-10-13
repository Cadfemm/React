import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "../styles/Signin.css";
// import Logo from "../assets/cadfem-logo.png";
import BG from "../assets/bg1.jpg";
// import Logo2 from "../assets/strategic-ventures-logo-dark.png";
import Loginnav from "../components/Loginnav"

import PizzaLeft from "../assets/hero.webp";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = () => {
    console.log(`Signing in with username: ${username} and password: ${password}`);
    
if (username.trim() === "Superadmin" && password === "cadcad") {
  history.push("/Home");
} else if (username.trim() === "CADFEM" && password === "Cadfem@2024") {
  history.push("/about");
} else {
  alert("Username or password is incorrect.");
  // or: throw new Error("Username or password is incorrect.");
}

  };

  const handleSignUp = () => {
    console.log(`Signing up with username: ${username} and password: ${password}`);
    history.push('/Signup');
  };

return (
   <div className="auth-bg" style={{
    backgroundImage: `url(${BG})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}>
    <Loginnav />

    <div className="auth-wrapper">
      <div className="auth-card">
        {/* LEFT: form */}
        <div className="auth-left">
          <div className="Title">
          <h2 className="auth-title">LOGIN</h2>
</div>
<div>
<form onSubmit={(e) => e.preventDefault()} className="auth-form">
  <label htmlFor="username" className="auth-label">User Name</label>
  <input
    type="text"
    id="username"
    value={username}
    onChange={handleUsernameChange}
    className="auth-input"
    placeholder="Enter your username"
  />

  <label htmlFor="password" className="auth-label">Password</label>
  <input
    type="password"
    id="password"
    value={password}
    onChange={handlePasswordChange}
    className="auth-input"
    placeholder="Enter your password"
  />

  <div className="auth-actions">
    <button type="button" className="btn-primary" onClick={handleSignIn}>Sign In</button>
    <button type="button" className="btn-ghost" onClick={handleSignUp}>Sign Up</button>
  </div>
</form></div>

        </div>

        {/* RIGHT: image */}
        <div className="auth-right">
          <img src={PizzaLeft} alt="Healthcare" className="auth-hero" />
        </div>
      </div>
    </div>
  </div>
);

};

export default Login;
