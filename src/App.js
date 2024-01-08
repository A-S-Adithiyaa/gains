import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import AssessmentLanding from "./components/assessments/AssessmentLanding";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />}></Route>
        <Route exact path="/assessments" element={<AssessmentLanding />} />
      </Routes>
    </>
  );
}

export default App;
