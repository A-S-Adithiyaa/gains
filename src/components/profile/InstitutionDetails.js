import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import session from "../../Variables";

function InstitutionDetails() {
  const [institute, setInstitute] = useState("");
  const [grade, setGrade] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    axios
      .get(
        session.springbootBaseUrl +
          "get-institute/" +
          localStorage.getItem("isLoggedIn")
      )
      .then((response) => {
        setGrade(response.data.grade);
        setInstitute(response.data.institute);
      });
    setLoading(true);
  }, []);

  const save_changes = () => {
    const formdata = {
      grade: grade,
      institute: institute,
    };
    axios
      .put(
        session.springbootBaseUrl +
          "update-institute/" +
          localStorage.getItem("isLoggedIn"),
        formdata
      )
      .then((response) => {
        toast.success("Details saved successfully!");
      })
      .catch((error) => {
        toast.error("Failed to save details. Please try again later.");
        console.error(error);
      });
  };

  return (
    <div>
      {loading ? (
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
                      value={institute}
                      onChange={(e) => {
                        setInstitute(e.target.value);
                      }}
                      type="text"
                    />
                  </Col>
                  <Col sm={6}>
                    <Form.Label>Grade</Form.Label>
                    <Form.Control
                      value={grade}
                      onChange={(e) => {
                        setGrade(e.target.value);
                      }}
                      type="text"
                    />
                  </Col>
                </Row>
                {/* <Row>
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
                </Row> */}
              </Row>
            </Row>
            <Button variant="success" onClick={save_changes}>
              Save
            </Button>
          </Container>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default InstitutionDetails;
