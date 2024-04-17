import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";

function HeroSection() {
  return (
    <Container>
      <Row className="mt-5 mb-5" md={12} sm={12}>
        <Col
          md={6}
          className="d-flex flex-column align-items-start justify-content-center"
        >
          <div className="text-container">
            <ul>
              <li>Explore</li>
              <li>Discover</li>
              <li>Learn</li>
              <li>Grow</li>
              <li>Repeat</li>
            </ul>
          </div>
        </Col>
        <Col
          md={6}
          className="image-container d-flex align-items-end justify-content-center"
        >
          <Image src="images/Webinar-bro 1.svg" alt="Placeholder" fluid />
        </Col>
      </Row>
      <Row className="align-items-center  justify-content-center">
        <Button className="get-started-button" href="#/signup">
          Get Started
        </Button>
      </Row>
    </Container>
  );
}

export default HeroSection;
