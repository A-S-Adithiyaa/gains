import "./App.css";
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import AssessmentLanding from "./components/assessments/AssessmentLanding";
import NavbarSection from "./components/Navbar";

function App() {
  return (
    <HashRouter>
      <NavbarSection />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/assessments" element={<AssessmentLanding />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
