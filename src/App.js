import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import AssessmentLanding from "./components/assessments/AssessmentLanding";
import NavbarSection from "./components/Navbar";

function App() {
  return (
    <>
      <NavbarSection />
      <Routes>
        <Route path="/gains" exact Component={Landing} />
        <Route path="/gains/assessments" exact Component={AssessmentLanding} />
      </Routes>
    </>
  );
}

export default App;
