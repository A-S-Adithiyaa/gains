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
        <Route exact path="/" element={<Landing />}></Route>
        <Route
          path="/gains/assessments"
          element={<AssessmentLanding />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
