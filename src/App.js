import "./App.css";
import Landing from "./pages/Landing";
import FlightDetails from "./pages/FlightDetails";
import UserDetails from "./pages/UserDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Success from "./pages/Success";

function App() {

  return (
    <div className="landing">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/flightdetails" element={<FlightDetails />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/success" element={<Success />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
