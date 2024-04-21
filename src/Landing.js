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
    title: "Sharleen",
    content:
      "I stumbled upon this websitewhile looking for studymaterials, and I'm so glad I did!The Learn section offers a widerange of educational contentthat's not only informative butalso engaging.",
    profession: "Student @ RV",
  },
  {
    imgSrc: "https://via.placeholder.com/150",
    title: "Phoboe",
    content:
      "As a student, I often struggle tofind reliable study resources, butthis website has been a gamechanger for me. The Learnsection covers everything frombasic concepts to advancedtopics, making it easy to findrelevant information for mystudies",
    profession: "Student @ BMSIT&M",
  },
  {
    imgSrc: "https://via.placeholder.com/150",
    title: "Tom",
    content:
      "I've been using this website fora while now, and it has becomean essential tool in my learningjourney. The Learn section offersa wealth of educational contentthat caters to learners of alllevels.",
    profession: "Student @ BMSIT&M",
  },
  {
    imgSrc: "https://via.placeholder.com/150",
    title: "Elena",
    content:
      "I've found this website to be incredibly helpful in my studies. The Learn section is comprehensive and covers topics in great detail. It's made learning much more enjoyable for me!",
    profession: "Student @ Ramaiah University",
  },
  {
    imgSrc: "https://via.placeholder.com/150",
    title: "Jack",
    content:
      "This website has been a lifesaver for me. The Learn section is like having a personal tutor at my fingertips. I've been able to grasp difficult concepts much more easily thanks to the clear explanations provided.",
    profession: "Student @ Reva University",
  },
  {
    imgSrc: "https://via.placeholder.com/150",
    title: "Sophia",
    content:
      "I can't thank this website enough for the valuable resources it provides. The Learn section covers everything I need for my courses and more. It's definitely boosted my academic performance!",
    profession: "Student @ Cambridge",
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
