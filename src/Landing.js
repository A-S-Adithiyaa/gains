import React, { Component } from "react";
import HomeBody from "./components/HeroSection";
import EducationSection from "./components/EducationSection";
import CardSection from "./components/CardSection";
import "./App.css";


class Landing extends Component {
  render() {
    return (
      <div>
        <div className="home-container">
          <HomeBody />
        </div>

        <div className="education-container">
          <EducationSection />
          <CardSection />
        </div>
      </div>
    );
  }
}

export default Landing;
