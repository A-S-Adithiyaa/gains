import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import axios from "axios";
import QuestionCard from "./components/QuestionCard";
import { MainApp } from "./components/PageElements/MainApp";
import { theme } from "./data/AppTheme";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    background: ${({ theme }) => theme.surface1};
    color: ${({ theme }) => theme.text1};
    font-size: clamp(1rem, 8vw, 1.3rem);
    > * {
      transition: 0.25s ease all;
    }
  }
  h1{
    font-size: clamp(1.2rem, 8vw, 2.8rem);
  }
`;

class GenerateQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      loading: false,
      takeAssessment: false,
      questionsAndAnswers: [],
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
    // console.log(response.data);
    this.setState({
      loading: false,
      takeAssessment: true,
      questionsAndAnswers: response.data,
    });
  };

  render() {
    const { loading, takeAssessment, questionsAndAnswers } = this.state;
    return (
      <>
        {loading && (
          <div className="loading-container">
            <img src="/images/infinity_gif.svg" alt="Loading..." />
          </div>
        )}
        {!takeAssessment ? (
          <Container>
            <Row>
              <Col
                xs={12}
                md={6}
                className="d-none d-md-flex align-items-center justify-content-center"
              >
                <Image src="/images/assessment_image.svg"></Image>
              </Col>
              <Col xs={12} md={6}>
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
                      {loading ? "Loading..." : "Send"}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        ) : (
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <MainApp className="app">
              <QuestionCard randQustions={questionsAndAnswers} />
              {/* <p style={{ fontSize: ".7rem", textAlign: "center" }}>
          made with ❤️ by Tedane Blake © {new Date().getFullYear()}
        </p> */}
            </MainApp>
          </ThemeProvider>
          // <TakeAssessment questions={questionsAndAnswers} />
        )}
      </>
    );
  }
}

export default GenerateQuestions;
