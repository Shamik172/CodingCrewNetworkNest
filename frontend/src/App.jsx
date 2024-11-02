import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login"; // Adjust the path as needed
import Signup from "./components/signup/signup"; // Adjust the path as needed

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Redirect or default route */}
          <Route path="*" element={<Login />} /> {/* Redirects to login if no path is matched */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
