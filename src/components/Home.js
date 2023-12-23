import React, { Component } from "react";
import "../App.css";

class Home extends Component {
  render() {
    return (
      <>
        <div className="home-container">
          <div className="navbar">
            <div className="space-between-navbar">
              <span>LEARN</span>
              <span>NOTES</span>
              <span>ASSESSMENTS</span>

              <h1 className="company-logo">
                G<span className="logo-name-black">AI</span>NS
              </h1>

              <span>QUESTIONS</span>
              <span>LOGIN</span>
              <button>SIGN UP</button>
            </div>
          </div>

          <div className="content-container">
            <div className="text-container">
              <ul>
                <li>Explore</li>
                <li>Discover</li>
                <li>Learn</li>
                <li>Grow</li>
                <li>Repeat</li>
              </ul>
            </div>
            <div className="image-container">
              <img src="images/student_with_book.svg" alt="Student with book" />
            </div>
          </div>
        </div>

        <div className="education-container">
        
        </div>
      </>
    );
  }
}

export default Home;
