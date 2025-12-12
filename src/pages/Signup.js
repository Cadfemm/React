import React, { useState } from 'react';
import "../styles/Signup.css";
import Loginnav from "../components/Loginnav";
import "../styles/Signin.css";
import PizzaLeft from "../assets/signup.jpg";
import {useHistory , Link} from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSignUp = () => {
    // Implement sign up functionality here
    console.log(`Signing up with name: ${name}, email: ${email}, phone number: ${phoneNumber}, age: ${age}, gender: ${gender}`);
    // You can add validation and actual sign-up logic here
  };
  const history = useHistory();
  const handleLogIn = () => {
    history.push("/");
  };

  return (
    <div>
<Loginnav />
    <div className="signup-container">
      <div className="signup-image">
        <img src={PizzaLeft} alt="Signup Image" />
      </div>
      <div className="signup-content">
        <h2>Register Here</h2>
        <form>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
         
          <table>
           
              <tr>
              <td style={{padding: '0px'}}>
          <div>
            
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={handleAgeChange}
            />
          </div>
        </td>
        <td>
          <div>
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              value={gender}
              onChange={handleGenderChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          </td>
          </tr>
         
          </table>
          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
          <div style={{display: "flex",alignItems: "center",justifyContent: "space-between", width:"100%", paddingTop:"40px"}}>
            <button type="button" onClick={handleSignUp}>Sign Up</button>
            <button type="button" onClick={handleLogIn}>LogIn</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Signup;
