import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaArrowRight } from "react-icons/fa";

function FooterSection() {
  return (
    <Container>
      <Row>
        <Col>
          <Image className="footer-image" src="images/5921724_20631 1.svg" />
        </Col>
        <Col>
          <Row className="footer-links-section">
            <Col style={{ fontSize: "40px", fontWeight: "700" }}>
              <p>
                G<span className="ai-colored">AI</span>NS
              </p>
            </Col>
          </Row>
          <Row className="footer-links-section">
            <Col sm>
              <p className="footer-title">Product</p>
              <p>Efficiency</p>
              <p>Technologies Used</p>
              <p>Training Time</p>
              <p>Graphs</p>
              <p>Tutorials</p>
              <p>Reviews</p>
            </Col>
            <Col sm>
              <p className="footer-title">Information</p>
              <p>Blog</p>
              <p>Support</p>
              <p>FAQ</p>
            </Col>
            <Col sm>
              <p className="footer-title">Company</p>
              <p>About Us</p>
              <p>Contact Us</p>
            </Col>
          </Row>
        </Col>
        <Col sm>
          <div className="subscribe-container">
            <h1>Subscribe</h1>
            <InputGroup className="mb-3">
              <Form.Control placeholder="user@gmail.com" />
              <Button>
                <FaArrowRight />
              </Button>
            </InputGroup>
            <p>
              Get the latest courses and monthly summary newsletter delivered
              right to your inbox
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default FooterSection;
