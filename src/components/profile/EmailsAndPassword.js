import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { TiTick } from "react-icons/ti";

function EmailsAndPassword() {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatched, setPasswordMatched] = useState(false);

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

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
    setPasswordMatched(event.target.value === userData.password);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div>
      {userData ? (
        <div>
          <Container>
            <Row>
              <Col sm={6}>
                <h1 style={{ marginTop: "15px", fontWeight: "600" }}>
                  Emails & Passwords
                </h1>
              </Col>
            </Row>

            <Row className="give-both-margins">
              <Row>
                <Col sm={6}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    readOnly
                    defaultValue={userData.email}
                    type="text"
                  />
                </Col>
                <Col sm={6}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    onChange={handleCurrentPasswordChange}
                    type="password"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    onChange={handleNewPasswordChange}
                    disabled={!passwordMatched}
                    type="password"
                  />
                </Col>
                <Col sm={6}>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    onChange={handleConfirmPasswordChange}
                    disabled={!passwordMatched}
                    type="password"
                  />
                </Col>
              </Row>
            </Row>
            {passwordMatched && (
              <Button variant="success">
                <TiTick style={{ marginRight: "5px" }} />
                Save
              </Button>
            )}

            <Row>
              <Col>
                <h1 style={{ marginTop: "15px", fontWeight: "600" }}>
                  Forgot Password
                </h1>
              </Col>
            </Row>
            <Form.Label>Email</Form.Label>
            <Stack direction="horizontal" gap={3}>
              <Form.Control value={userData.email} readOnly />
              <Button variant="success">Submit</Button>
            </Stack>
          </Container>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EmailsAndPassword;
