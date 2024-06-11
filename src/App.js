import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Signin"; // Assuming useLocation is used in the Login component
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

function App() {
  return (
    <div className="App">
      <Router>
        {/* Navbar */}
        <Route
          render={({ location }) => (location.pathname !== "/" && location.pathname !== "/Signup") && <Navbar />}
        />

        {/* Switch and Routes */}
        <Switch>
          <Route path="/Home" exact component={Home} />
          <Route path="/menu" exact component={Menu} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/treatment/Subtreatments" exact component={treatments} />
          <Route path="/treatment/Cyberdyne" exact component={Cyberdyne} />
          <Route path="/treatment/pablotests" exact component={pablotests} />
          <Route path="/treatment/Tymo" exact component={Tymo} />
          <Route path="/treatment/Plabo" exact component={Plabo} />
          <Route path="/Output" exact component={Output} />
          <Route path="/" exact component={Login} />
          <Route path="/Signup" exact component={Signup} />
          <Route path="/Spinalinjury" exact component={SpinalInjury} />
          <Route path="/Modalities" exact component={latest} />
          <Route path="/stroke" exact component={stroke} />
        </Switch>

        {/* Footer */}
        <Route
          render={({ location }) => (location.pathname !== "/" && location.pathname !== "/Signup") && <Footer />}
        />
      </Router>
    </div>
  );
}

export default App;
