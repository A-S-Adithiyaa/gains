import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";

function HeroSection() {
  return (
    <Container>
      <Row>
        <Col md={6}>
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
        <Col md={6} className="image-container">
          <Image src="images/student_with_book.svg" alt="Placeholder" fluid />
        </Col>
      </Row>
    </Container>
  );
}
export default HeroSection;
