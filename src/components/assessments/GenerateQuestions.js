import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

class GenerateQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      loading: false,
    };
  }

  handleInputChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  handleSubmit = async () => {
    this.setState({ loading: true });
    const { input } = this.state;
    const response = await axios.post("http://localhost:5000/generate_qa", {
      context: input,
    });
    console.log(response.data);
    this.setState({ loading: false });
  };

  render() {
    const { loading } = this.state;
    return (
      <>
        {loading && (
          <div className="loading-container">
            <img src="/images/loading_bg_removed.gif" alt="Loading" />
          </div>
        )}
        <Container>
          <Row>
            <Col xs={12} className="text-center">
              <h1>Assessments</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="text-center">
              <Form>
                <Form.Control
                  as="textarea"
                  rows={12}
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
                {loading ? "Loading..." : "Send"}
              </Button>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default GenerateQuestions;
