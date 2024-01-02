import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";

const EducationSection = () => {
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
          <Row className="education-text">
            {/* <Col className="education-text" xs={6}> */}
            Education
            {/* </Col> */}
          </Row>
          <Row className="education-tagline">
            {/* <Col className="education-tagline" xs={6}> */}
            The journey of a lifetime
            {/* </Col> */}
          </Row>
        </Col>
        <Col md={6} className="center-col">
          Embark on a transformative journey of self-discovery as you unlock
          your potential through a commitment to lifelong learning
        </Col>
      </Row>
    </Container>
  );
};

export default EducationSection;
