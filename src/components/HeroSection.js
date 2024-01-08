import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";

function HeroSection() {
  return (
    <Container>
      <Row md={12} sm={12}>
        <Col
          md={6}
          className="d-flex flex-column align-items-start justify-content-end"
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
          className="image-container d-flex align-items-end justify-content-end"
        >
          <Image src="images/student_with_book.svg" alt="Placeholder" fluid />
        </Col>
      </Row>
    </Container>
  );
}

export default HeroSection;
