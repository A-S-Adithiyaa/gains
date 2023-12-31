import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

function HomeBody() {
  return (
    <>
      <Container>
        <Row className="d-xl-flex">
          <Col>
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
          <Col>
            {/* <Image className="mt-3" src="images/student_with_book.svg" fluid /> */}
            <div className="image-container">
              <img src="images/student_with_book.svg" alt="Student with book" />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomeBody;
