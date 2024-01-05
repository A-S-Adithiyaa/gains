import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Landing from "./Landing";
import AssessmentLanding from "./components/assessments/AssessmentLanding";
import NavbarSection from "./components/Navbar";

function App() {
  return (
    <BrowserRouter basename="/gains">
      <NavbarSection />
      <Routes>
        <Route exact path="/gains" element={<Landing />} />
        <Route path="/assessments" element={<AssessmentLanding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
