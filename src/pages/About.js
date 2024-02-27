import React from "react";
import Health from "../assets/globe.png";
import banner from "../assets/about_us.jpg";
import "../styles/About.css";
import Contact from "../pages/Contact.js";
function About() {
  return (
    <div >
      <div class="banner"  style={{ backgroundImage: `url(${banner})`,height:"390px" }}>
  ABOUT US
</div>
      <div className="aboutBottom">
        <h3> CADFEM GLOBAL TECHNOLOGY PORTFOLIO</h3>
        
        <p>
        Simulation is only the beginning. Choosing the right software is just the first step in your simulation journey. True success 
comes from integrating these tools seamlessly into your development processes. Effective software deployment and adoption 
will need the enablement from complementary solutions, which is why we offer a range of solutions including consulting, 
training, and ongoing support. We're evolving to becoming a digital engineering solutions company, where simulation, 
automation, and process optimization are crucial for product development. Our goal is to inspire and motivate customers to 
push their limits in every field of engineering, and enable them to disrupt conventions. Virtualisation, numerical simulations and 
other digital pathways are definitive vehicles which can help us catch up with the technological metamorphoses.
        </p>
       <ul> <li>ANSYS SOFTWARE SUITE OF PRODUCTS</li>
        <li>ENGINEERING SERVICES</li>
        <li>CUSTOM BUILD DIGITAL SOLUTIONS (SaaS and On-Premises) </li>
        <li>DIGITAL ENGINEERING IT SOLUTIONS</li>
       
        </ul>
        <h3 style={{height:'90px',padding:'20px'}}> <span className="years">40 YEARS OF</span>  RAPID INNOVATION AND EASY VALIDATION OF 
DESIGN IDEAS</h3>
        <div className="container">
      <div className="image">
        <img src={Health} alt="Company" />
      </div>
      <div className="achievements">
        
        <ul>
          <li><span className="number">19+</span> Companies</li>
          <li><span className="number">450+</span> Employees</li>
          <li><span className="number">35+</span> Locations</li>
          <li><span className="number">30+</span> Countries</li>
        </ul>
      </div>
    </div>
    <h3>In India, CADFEM is an<span className="years"> ANSYS Elite Channel Partner.</span></h3>
        <p>
        Founded in 2007, CADFEM India Pvt. Ltd. is one of the pioneers of numerical simulation based on the Finite Element 
Method (FEM) and is a part of CADFEM International - one of the largest European suppliers of Computer-Aided 
Engineering (CAE), with Global Headquarters in Germany and Local Headquarters in Hyderabad. Since 1985, CADFEM 
has continuously supported the practical use of advanced technology in business and science. Our name has always stood 
for a close partnership with Ansys: CADFEM sells the entire Ansys simulation portfolio for structural mechanics, fluid 
mechanics, electromechanics and magnetics, electronics and embedded software covering every industry and application. 
        </p>
        <p>
        Effective software deployment and adoption will need the enablement from complementary solutions, which is why we 
offer a range of solutions including consulting, training, and ongoing support. We're evolving to becoming a digital 
engineering solutions company, where simulation, automation, and process optimization are crucial for product 
development. Our goal is to inspire and motivate customers to push their limits in every field of engineering, and enable 
them to disrupt conventions. Virtualisation, numerical simulations and other digital pathways are definitive vehicles which 
can help us catch up with the technological metamorphoses.
        </p>
      </div>
      <Contact />
    </div>
  );
}

export default About;
