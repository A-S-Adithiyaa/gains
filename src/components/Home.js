import React, { Component } from "react";
import "../App.css";
import CollapsibleExample from "./Navbar";
import HomeBody from "./HomeBody";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="home-container">
          {/* <div className="navbar">
              <div className="space-between-navbar">
              <span>LEARN</span>
              <span>NOTES</span>
              <span>ASSESSMENTS</span>

              <h1 className="company-logo">
                G<span className="logo-name-black">AI</span>NS
              </h1>

              <span>QUESTIONS</span>
              <span>LOGIN</span>
              <button className="sign-up-button">SIGN UP</button>
            </div>
          </div> */}

          <CollapsibleExample />
          <HomeBody />

          {/* <div className="content-container">
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
          </div> */}
        </div>

        <div className="education-container"></div>
      </div>
    );
  }
}

export default Home;
