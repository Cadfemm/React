import "./App.css";
import "./styles/design-system.css";
import Login from "./pages/Signin";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
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
import SessionAssessmentPage from "./features/Optometry/pages/SessionAssessmentPage";
import TokenHandler from "./shared/auth/TokenHandler";

// ── Auth check ──────────────────────────────────────────────────────────────
function isAuthenticated() {
  const token  = localStorage.getItem("access_token");
  const expiry = localStorage.getItem("access_token_expiry");
  if (!token) return false;
  if (expiry && new Date(expiry) <= new Date()) return false;
  return true;
}

// ── Protected route ─────────────────────────────────────────────────────────
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location, ...props }) =>
        isAuthenticated() ? (
          <Component {...props} location={location} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
      }
    />
  );
}

function App() {
  console.log("App component rendering...");

  try {
    return (
      <div className="App">
        <Router basename="">
          {/*
            TokenHandler sits inside Router so it has access to location/history.
            It runs on every page — if ?token= is in the URL it auto-authenticates
            the user and strips the token from the URL.
          */}
          <TokenHandler />

          <Switch>
            {/* ── Public — no auth required ── */}
            <Route path="/"        exact component={Login} />
            <Route path="/Signup"  exact component={Signup} />
            <Route path="/about"   exact component={About} />
            <Route path="/contact" exact component={Contact} />

            {/* ── SSO deep-links — handle their own auth via ?token= ── */}
            <Route path="/dept/:department"                component={DeptEntry} />
            <Route path="/optometry/assessment/:sessionId" exact component={SessionAssessmentPage} />

            {/* ── Protected pages — redirect to / if not logged in ── */}
            <PrivateRoute path="/Home"           exact component={Home} />
            <PrivateRoute path="/menu/:mode?"    exact component={Menu} />
            <PrivateRoute path="/Patients"       exact component={Cyberdyne} />
            <PrivateRoute path="/Neurophysics"   exact component={pablotests} />
            <PrivateRoute path="/AdminTherapist" exact component={treatments} />
            <PrivateRoute path="/CMO"            exact component={Tymo} />
            <PrivateRoute path="/HOD"            exact component={Plabo} />
            <PrivateRoute path="/Doctor"         exact component={stroke} />
            <PrivateRoute path="/Spinalinjury"   exact component={SpinalInjury} />
            <PrivateRoute path="/Output"         exact component={Output} />
            <PrivateRoute path="/psychology/patient/:id" exact component={PatientDetails} />
            <PrivateRoute path="/Modalities"     exact component={latest} />
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
