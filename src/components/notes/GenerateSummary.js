import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

class GenerateQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: localStorage.getItem("input") || "",
      loading: false,
      generateSummary: false,
      summary: [],
    };
  }

  handleInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({
      input: inputValue,
    });
    localStorage.setItem("input", inputValue); // Store input in localStorage
  };

  handleSubmit = async () => {
    this.setState({ loading: true });
    const { input } = this.state;
    const response = await axios.post(
      "http://localhost:5000/generate_summary",
      {
        context: input,
      }
    );
    console.log(response.data);
    this.setState({
      loading: false,
      generateSummary: true,
      summary: response.data,
    });
  };

  render() {
    const { loading, generateSummary, summary } = this.state;
    return (
      <>
        {loading && (
          <div className="loading-container">
            <img src="images/infinity_gif.svg" alt="Loading..." />
          </div>
        )}

        <Container>
          <Row>
            <Col
              xs={12}
              md={6}
              className="d-none d-md-flex align-items-center justify-content-center"
            >
              {!generateSummary ? (
                <Image src="images/notes.svg"></Image>
              ) : (
                <ListGroup as="ol" numbered>
                  {summary.map((item, index) => (
                    <ListGroup.Item key={index} as="li">
                      {item}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>
            <Col xs={12} md={6}>
              <Row>
                <Col xs={12} className="text-center">
                  <h1>Notes</h1>
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="text-center">
                  <Form>
                    <Form.Control
                      as="textarea"
                      rows={20}
                      placeholder="Place your content"
                      value={this.state.input}
                      onChange={this.handleInputChange}
                    />
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="text-center">
                  <Button
                    className="assessment-send-button"
                    variant="primary"
                    onClick={this.handleSubmit}
                  >
                    {loading ? "Loading..." : "Generate"}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default GenerateQuestions;
