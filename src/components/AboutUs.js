import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";

function AboutUs() {
  return (
    <Container>
      <Row className="mt-5 mb-5 justify-content-center">
        <Col
          md={6}
          className="image-container d-flex align-items-end justify-content-center"
        >
          <Image
            src="images/Speech to text-pana 1.svg"
            alt="Placeholder"
            fluid
          />
        </Col>
        <Col className="d-flex flex-column align-items-stretch justify-content-center">
          <Row className="flex-fill">
            <Col className="my-auto text-center" sm>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title className="first-title">What We Offer</Card.Title>
                  <hr className="card-hr" />
                  <Card.Text>
                    <button className="view-services-button">
                      View All Services
                    </button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col className="my-auto text-center" sm>
              <Card className="h-100">
                <Card.Body>
                  <Image
                    src="images/Artificial Intelligence.svg"
                    alt="Placeholder"
                    fluid
                  />
                  <Card.Title className="card-titles">
                    Artificial Intelligence
                  </Card.Title>
                  <hr className="card-hr" />
                  <Card.Text className="card-text">
                    The tutoring AI contains vast and comprehensive knowledge
                    base
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="text-center flex-fill">
            <Col className="my-auto text-center" sm>
              <Card className="h-100">
                <Card.Body>
                  <Image src="images/Path Steps.svg" alt="Placeholder" fluid />
                  <Card.Title className="card-titles">
                    Personalized Learning
                  </Card.Title>
                  <hr className="card-hr" />
                  <Card.Text className="card-text">
                    Proctored assessments to put your skills to test
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col className="my-auto text-center" sm>
              <Card className="h-100">
                <Card.Body>
                  <Image src="images/Future.svg" alt="Placeholder" fluid />
                  <Card.Title className="card-titles">
                    Fast & reliable
                  </Card.Title>
                  <hr className="card-hr" />
                  <Card.Text className="card-text">
                    Uses Large Language Models (LMS) to generate summary
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;
