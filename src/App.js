import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import AssessmentLanding from "./components/assessments/AssessmentLanding";

function App() {
  return (
    // <BrowserRouter basename="/gains">
    <BrowserRouter>
      <Routes>
        <Route index path="/gains" element={<Landing />} />
        <Route path="/assessment" element={<AssessmentLanding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
