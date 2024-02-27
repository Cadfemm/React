// Contact.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope,faComment,faUser } from "@fortawesome/free-solid-svg-icons";
import PizzaLeft from "../assets/contactus.png";
import "../styles/Contact.css";

function Contact() {
  return (
    <div className="contact">
      
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${PizzaLeft})` }}
      ></div>
      <div className="rightSide">
        <h1>
          Contact Us
        </h1>

        <form id="contact-form" method="POST">
          <label htmlFor="name"><FontAwesomeIcon icon={faUser}  style={{color:"rgb(149, 40, 175)",paddingRight:"10px"}}/> Full Name</label>
          <input name="name" placeholder="Enter full name..." type="text" />
          <label htmlFor="email">
            <FontAwesomeIcon icon={faEnvelope}  style={{color:"rgb(168, 199, 70)",paddingRight:"10px"}}/> Email
          </label>
          <input name="email" placeholder="Enter email..." type="email" />
          <label htmlFor="message"><FontAwesomeIcon icon={faComment} style={{color:"rgb(231 76 60 / 64%)",paddingRight:"10px"}} /> Message</label>
          <textarea
            rows="6"
            placeholder="Enter message..."
            name="message"
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
