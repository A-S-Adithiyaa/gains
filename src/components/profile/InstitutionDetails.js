import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";

function InstitutionDetails() {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const [grade, setGrade] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContactNumber] = useState("");

  useEffect(() => {
    const hardcodedUserData = {
      image: "",
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      dob: "1990-01-01",
      country: "United States",
      password: "123456",
    };

    setUserData(hardcodedUserData);

    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <Container>
            <Row>
              <Col>
                <h1 style={{ marginTop: "15px", fontWeight: "600" }}>
                  Instituion Details
                </h1>
              </Col>
            </Row>

            <Row>
              <Row className="give-both-margins">
                <Row>
                  <Col sm={6}>
                    <Form.Label>Institute Name</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setInstituteName(e.target.value);
                      }}
                      type="text"
                    />
                  </Col>
                  <Col sm={6}>
                    <Form.Label>Grade</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setGrade(e.target.value);
                      }}
                      type="password"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <Form.Label>Address of Institute</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      type="text"
                    />
                  </Col>
                  <Col sm={6}>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setContactNumber(e.target.value);
                      }}
                      type="text"
                    />
                  </Col>
                </Row>
              </Row>
            </Row>
            <Button type="success">Save</Button>
          </Container>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default InstitutionDetails;
