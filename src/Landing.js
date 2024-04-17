import React, { Component } from "react";
import HomeBody from "./components/HeroSection";
import "./App.css";
import AboutUs from "./components/AboutUs";
import AboutSection from "./components/AboutSection";
import ReviewSection from "./components/ReviewSection";
import FooterSection from "./components/FooterSection";

const cards = [
  {
    imgSrc: "https://via.placeholder.com/150",
    title: "Card 1",
    content:
      "I stumbled upon this websitewhile looking for studymaterials, and I'm so glad I did!The Learn section offers a widerange of educational contentthat's not only informative butalso engaging.",
    profession: "Student @ BMSIT&M",
  },
  {
    imgSrc: "https://via.placeholder.com/150",
    title: "Card 2",
    content:
      "As a student, I often struggle tofind reliable study resources, butthis website has been a gamechanger for me. The Learnsection covers everything frombasic concepts to advancedtopics, making it easy to findrelevant information for mystudies",
    profession: "Student @ BMSIT&M",
  },
  {
    imgSrc: "https://via.placeholder.com/150",
    title: "Card 3",
    content:
      "I've been using this website fora while now, and it has becomean essential tool in my learningjourney. The Learn section offersa wealth of educational contentthat caters to learners of alllevels.",
    profession: "Student @ BMSIT&M",
  },
  {
    imgSrc: "https://via.placeholder.com/150",
    title: "Card 4",
    content:
      "I stumbled upon this websitewhile looking for studymaterials, and I'm so glad I did!The Learn section offers a widerange of educational contentthat's not only informative butalso engaging.",
    profession: "Student @ BMSIT&M",
  },
  {
    imgSrc: "https://via.placeholder.com/150",
    title: "Card 5",
    content:
      "As a student, I often struggle tofind reliable study resources, butthis website has been a gamechanger for me. The Learnsection covers everything frombasic concepts to advancedtopics, making it easy to findrelevant information for mystudies",
    profession: "Student @ BMSIT&M",
  },
  {
    imgSrc: "https://via.placeholder.com/150",
    title: "Card 6",
    content:
      "I've been using this website fora while now, and it has becomean essential tool in my learningjourney. The Learn section offersa wealth of educational contentthat caters to learners of alllevels.",
    profession: "Student @ BMSIT&M",
  },
];

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="home-container">
          <HomeBody />
        </div>
        <div className="about-us-container">
          <AboutUs />
        </div>
        <div className="about-section-container">
          <AboutSection />
        </div>
        <div className="review-section-container">
          <ReviewSection cards={cards} />
        </div>
        <div className="footer-section-container">
          <FooterSection />
        </div>
      </div>
    );
  }
}

export default Landing;
