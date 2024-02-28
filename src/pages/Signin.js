import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "../styles/Signin.css";
import Logo from "../assets/cadfem-logo.png";
import Logo2 from "../assets/strategic-ventures-logo-dark.png";
import Loginnav from "../components/Loginnav"

import PizzaLeft from "../assets/login3.svg";

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
    
    if ((username === "AnushaCad" && password === "cadcad") || (username === "CADFEM" && password === "Cadfem@2024")){
      history.push('/Home');
    } else {
        alert("Incorrect username or password. Please try again.");
    }
  };

  const handleSignUp = () => {
    console.log(`Signing up with username: ${username} and password: ${password}`);
    history.push('/Signup');
  };

  return (
   
    <div>
<Loginnav />
    <div className="login-container">
      <div className="login-image">
        <img src={PizzaLeft} alt="Login Image" />
      </div>
      <div className="login-content">
        <h2>Login</h2>
        <form>
          <div style={{padding:'20px'}}>
            <label  htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div style={{padding:'20px'}}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div style={{display: "flex",alignItems: "center",justifyContent: "space-between", width:"100%", paddingTop:"30px"}}>
            <button type="button" onClick={handleSignIn}>Sign In</button>
            <button type="button" onClick={handleSignUp}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
