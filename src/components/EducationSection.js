import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

function EducationSection() {
  return (
    <Container>
      <Row>
        <Col md={6}>
          <Row>
            <Image
              className="education-bulb"
              src="images/bulb_image.svg"
              alt="Placeholder"
              fluid
            />
          </Row>
          <Row className="education-text">Education</Row>
          <Row className="education-tagline">The journey of a lifetime</Row>
        </Col>
        <Col md={6} className="center-col">
          Embark on a transformative journey of self-discovery as you unlock
          your potential through a commitment to lifelong learning
        </Col>
      </Row>
    </Container>
  );
}

export default EducationSection;
