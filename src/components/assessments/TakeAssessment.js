import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

// const questions = [
//   ["Question 1", "Answer 1"],
//   ["Question 2", "Answer 2"],
//   //... add more questions here
// ];

function TakeAssessment({ questions }) {
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userAnswer = event.target.answer.value;

    if (userAnswer.toLowerCase() === questions[currentIndex][1].toLowerCase()) {
      setScore(score + 1);
    }

    setCurrentIndex(currentIndex + 1);
    event.target.answer.value = "";
  };

  // useEffect(() => {
  //   document.title = `Question ${currentIndex + 1} of ${questions.length}`;
  // }, [currentIndex]);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Quiz Application</h1>
        </Col>
      </Row>

      {currentIndex < questions.length ? (
        <Row className={`question ${currentIndex % 2 === 0 ? "active" : ""}`}>
          <Col>
            <h2>{questions[currentIndex][0]}</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="answer">
                <Form.Control type="text" name="answer" required />
              </Form.Group>
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
              Your score is: {score} / {questions.length}
            </h3>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default TakeAssessment;

// import React from "react";

// const TakeAssessment = ({ questionsAndAnswers }) => {
//   // Use the 'input' prop in your component

//   console.log(questionsAndAnswers);

//   return (
//     <div>
//       <h2>Take Assessment Component</h2>
//       <p>Input from GenerateQuestions: {questionsAndAnswers}</p>
//       {/* Add your TakeAssessment component content here */}
//     </div>
//   );
// };

// export default TakeAssessment;
