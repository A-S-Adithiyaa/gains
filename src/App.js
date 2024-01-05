import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import AssessmentLanding from "./components/assessments/AssessmentLanding";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/gains" element={<Landing />} />
        <Route path="/gains/assessment" element={<AssessmentLanding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
