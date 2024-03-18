import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import AssessmentLanding from "./components/assessments/AssessmentLanding";
import LoginPage from "./components/login-signup/LoginPage";
import SignUpPage from "./components/login-signup/SignUpPage";
import NotesLanding from "./components/notes/NotesLanding";
import LearnLanding from "./components/learn/LearnLanding";
import History from "./components/history/History";
import ProfileLanding from "./components/profile/ProfileLanding";
import Navbar from "./components/Navbar";
import QuestionsLanding from "./components/questions/QuestionsLAnding";
// import ResetPassword from "./components/login-signup/ResetPassword";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Landing />}></Route>
        <Route exact path="/assessments" element={<AssessmentLanding />} />
        <Route exact path="/notes" element={<NotesLanding />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/history" element={<History />} />
        <Route exact path="/profile" element={<ProfileLanding />} />
        <Route exact path="/questions" element={<QuestionsLanding />} />
        <Route exact path="/learn" element={<LearnLanding />} />
        {/* <Route exact path="/reset-password" element={<ResetPassword />} /> */}
      </Routes>
    </>
  );
}

export default App;
