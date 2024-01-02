import React, { Component } from "react";
import "./App.css";
import NavbarSection from "./components/Navbar";
import HomeBody from "./components/HeroSection";
import EducationSection from "./components/EducationSection";

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="home-container">
          <NavbarSection />
          <HomeBody />
        </div>

        <div className="education-container">
          <EducationSection />
        </div>
      </div>
    );
  }
}

export default Landing;
