import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import AssessmentLanding from "./components/assessments/AssessmentLanding";
import LoginPage from "./components/login-signup/LoginPage";
import SignUpPage from "./components/login-signup/SignUpPage";
import NotesLanding from "./components/notes/NotesLanding";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />}></Route>
        <Route exact path="/assessments" element={<AssessmentLanding />} />
        <Route exact path="/notes" element={<NotesLanding />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
