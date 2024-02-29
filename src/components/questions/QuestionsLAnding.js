import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuestionAnswering from "./QuestionAnswering";

function QuestionsLanding() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // If the user is not logged in, navigate to the login page
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="assessment-landing">
      <QuestionAnswering />
    </div>
  );
}

export default QuestionsLanding;
