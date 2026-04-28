import "./App.css";
import "./styles/design-system.css";
import Login from "./pages/Signin";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cyberdyne from "./pages/Cyberdyne";
import treatments from "./pages/treatments";
import pablotests from "./pages/pablotests";
import Tymo from "./pages/Tymo";
import Plabo from "./pages/Plabo";
import Output from "./pages/Output";
import Signup from "./pages/Signup";
import SpinalInjury from "./pages/SpinalInjury";
import stroke from "./pages/stroke";
import latest from "./pages/Carddisplay.js";
import PatientDetails from "./features/Psychology/components/PatientDetails.jsx";
import DeptEntry from "./pages/DeptEntry";

function App() {
  console.log("App component rendering...");
  
  try {
    return (
      <div className="App">
        <Router basename="/React">
          <Switch>
            {/* ── Public ── */}
            <Route path="/"       exact component={Login} />
            <Route path="/Signup" exact component={Signup} />
            <Route path="/about"  exact component={About} />
            <Route path="/contact" exact component={Contact} />

            {/* ── Deep-link: /dept/<slug>?token=<jwt> ── */}
            <Route path="/dept/:department" component={DeptEntry} />

            {/* ── App pages ── */}
            <Route path="/Home"           exact component={Home} />
            <Route path="/menu/:mode?"    exact component={Menu} />
            <Route path="/Patients"       exact component={Cyberdyne} />
            <Route path="/Neurophysics"   exact component={pablotests} />
            <Route path="/AdminTherapist" exact component={treatments} />
            <Route path="/CMO"            exact component={Tymo} />
            <Route path="/HOD"            exact component={Plabo} />
            <Route path="/Doctor"         exact component={stroke} />
            <Route path="/Spinalinjury"   exact component={SpinalInjury} />
            <Route path="/Output"         exact component={Output} />
            <Route path="/psychology/patient/:id" exact component={PatientDetails} />
            <Route path="/Modalities"     exact component={latest} />
          </Switch>
        </Router>
      </div>
    );
  } catch (error) {
    console.error("App rendering error:", error);
    return (
      <div style={{ padding: "20px", color: "red", backgroundColor: "white" }}>
        <h1>Application Error</h1>
        <p>{error.toString()}</p>
        <pre>{error.stack}</pre>
      </div>
    );
  }
}

export default App;
