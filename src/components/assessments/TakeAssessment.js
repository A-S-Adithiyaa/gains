import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import session from "../../Variables";

function TakeAssessment({ mcqQuestions }) {
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMCQSubmit = (event) => {
    event.preventDefault();

    const userAnswer = event.target.answer.value;

    if (
      userAnswer.toLowerCase() ===
      mcqQuestions[currentIndex].correctAnswer.toLowerCase()
    ) {
      setScore(score + 1);
    }

    setCurrentIndex(currentIndex + 1);
  };

  return (
    <>
    <Container>
      <Row>
        <Col>
          <h1>Quiz Application</h1>
        </Col>
      </Row>

      {currentIndex < mcqQuestions.length ? (
        <Row className={`question ${currentIndex % 2 === 0 ? "active" : ""}`}>
          <Col>
            <h2>{mcqQuestions[currentIndex].question}</h2>
            <Form onSubmit={handleMCQSubmit}>
              {mcqQuestions[currentIndex].options.map((option, index) => (
                <Form.Check
                  key={index}
                  type="radio"
                  label={option}
                  name="answer"
                  value={option}
                  required
                />
              ))}
              <Button
                className="assessment-send-button"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <h2>Quiz Completed!</h2>
            <h3>
              Your score is: {score} / {mcqQuestions.length}
            </h3>
          </Col>
        </Row>
      )}
    </Container>
    
    </>
  );
}

export default TakeAssessment;
