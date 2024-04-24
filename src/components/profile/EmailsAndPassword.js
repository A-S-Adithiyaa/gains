import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { TiTick } from "react-icons/ti";
import { toast } from "react-toastify";
import axios from "axios";
import session from "../../Variables";

function EmailsAndPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  useEffect(() => {
    axios
      .get(
        session.springbootBaseUrl +
          localStorage.getItem("isLoggedIn") +
          "/get-email"
      )
      .then((response) => setEmail(response.data))
      .catch((error) => console.log(error));
  }, []);

  const save_password = () => {
    if (newPassword === confirmPassword) {
      axios
        .put(
          session.springbootBaseUrl +
            localStorage.getItem("isLoggedIn") +
            "/change-password",
          {
            password: newPassword,
          }
        )
        .then(() => toast("Password Updated"))
        .catch((error) => console.log(error));
      setConfirmPassword("");
      setNewPassword("");
    } else {
      toast("Password doesn't match");
    }
  };

  return (
    <div>
      {loading ? (
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
                  <Form.Control readOnly value={email} type="text" />
                </Col>
                {/* <Col sm={6}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={currentPassword}
                    onChange={(e)=>setCurrentPassword(e.target.value)}
                    type="password"
                  />
                </Col> */}
              </Row>
              <Row>
                <Col sm={6}>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    type="password"
                  />
                </Col>
                <Col sm={6}>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    type="password"
                  />
                </Col>
              </Row>
            </Row>
            <Button variant="success" onClick={save_password}>
              <TiTick style={{ marginRight: "5px" }} />
              Save
            </Button>

            {/* <Row>
              <Col>
                <h1 style={{ marginTop: "15px", fontWeight: "600" }}>
                  Forgot Password
                </h1>
              </Col>
            </Row>
            <Form.Label>Email</Form.Label>
            <Stack direction="horizontal" gap={3}>
              <Form.Control value={email} readOnly />
              <Button variant="success">Submit</Button>
            </Stack> */}
          </Container>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EmailsAndPassword;
