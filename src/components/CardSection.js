import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";

function CardSection() {
  return (
    <Container className="cards_section">
      <Row xs={1} md={3} className="g-4">
        <Col>
          <Card className="cards_style">
            <Card.Img
              className="card_image"
              height={70}
              variant="start"
              src="images/ai_icon.svg"
            />
            <Card.Body>
              <Card.Title className="card_title">
                Get taught by the most effective AI assistant
              </Card.Title>
              <Card.Text className="card_text">
                The tutoring AI contains vast and comprehensive knowledge base
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="cards_style">
            <Card.Img
              className="card_image"
              height={70}
              variant="top"
              src="images/clock_icon.svg"
            />
            <Card.Body>
              <Card.Title className="card_title">
                Get notes summary within seconds
              </Card.Title>
              <Card.Text className="card_text">
                Uses Large Language Models (LMS) to generate summary
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="cards_style">
            <Card.Img
              className="card_image"
              height={70}
              variant="top"
              src="images/roadmap_icon.svg"
            />
            <Card.Body>
              <Card.Title className="card_title">
                Personalized learning Journeys
              </Card.Title>
              <Card.Text className="card_text">
                Proctored assessments to put your skills to test
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CardSection;
