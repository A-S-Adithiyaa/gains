import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GenerateSummary from "./GenerateSummary";
import session from "../../Variables";

function NotesLanding() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // If the user is not logged in, navigate to the login page
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  if (localStorage.getItem("isLoggedIn")) {
    return (
      <div className="assessment-landing">
        <GenerateSummary />
      </div>
    );
  }
}

export default NotesLanding;
