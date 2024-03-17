import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { CgAddR } from "react-icons/cg";
// import "./notes.css";

class GenerateNotesVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: localStorage.getItem("input") || "",
      loading: false,
      generateSummary: false,
      fetchVideo: "",
      summary: [],
      title: "",
      tid: localStorage.getItem("current_topic"),
      id: localStorage.getItem("isLoggedIn"),
    };
  }

  componentDidMount() {
    if (this.state.tid != null) {
      axios
        .get("http://localhost:8080/jpa/" + this.state.tid + "/get-notes")
        .then((response) => {
          this.setState({
            summary: response.data.summary.split(".|"),
            generateSummary: true,
          });
        })
        .catch((error) => console.log(error));
    }
  }

  fetchVideo = () => {
    // Define your API endpoint
    const apiUrl = "http://localhost:5000/video"; // Update with your actual API endpoint

    // Update state to indicate fetching
    this.setState({ loading: true });

    // Make the API call to fetch the video
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response);
        // Assuming the response contains the video URL
        this.setState({
          videoUrl: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        console.error("Error fetching video:", error);
        this.setState({ loading: false });
      });
  };

  handleInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({
      input: inputValue,
    });
    if (this.state.tid !== null) {
      fetch("http://localhost:8080/jpa/" + this.state.tid + "/edit-content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event.target.value),
      }).catch((error) => console.log(error));
    }
    localStorage.setItem("input", inputValue); // Store input in localStorage
  };

  handleSubmit = async () => {
    console.log(this.state.summary);

    this.setState({ loading: true });

    const { input } = this.state;
    if (this.state.tid === null) {
      await axios
        .post("http://localhost:5000/generate-title", {
          context: input,
        })
        .then((response) => {
          this.setState({
            title: response.data.title,
            loading: false,
          });

          fetch(
            "http://localhost:8080/jpa/" + this.state.id + "/create-topics",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                topic: response.data.title,
                content: this.state.input,
              }),
            }
          )
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              localStorage.setItem("current_topic", data);
              this.setState({
                tid: data,
              });
              this.setState({
                loading: false,
              });
              this.generateSumm(data);
            })
            .catch(function (error) {
              console.log(error);
            });
        });
    } else {
      this.generateSumm(this.state.tid, true);
    }
  };

  generateSumm = (tid, val) => {
    axios
      .post("http://localhost:5000/generate_summary", {
        context: this.state.input,
      })
      .then((response) => {
        this.setState({
          loading: false,
          generateSummary: true,
          summary: response.data,
        });

        !val
          ? this.createNotes(response.data, tid)
          : this.editNotes(response.data, tid);
      });
  };

  createNotes = (data, tid) => {
    console.log(data);
    fetch("http://localhost:8080/jpa/" + tid + "/create-notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: this.state.title,
        summary: data.join(".|"),
      }),
    }).catch(function (error) {
      console.log(error);
    });
  };

  editNotes = (data, tid) => {
    console.log("inside edit");
    fetch("http://localhost:8080/jpa/" + tid + "/edit-notes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: data.join(".|"),
      }),
    }).catch(function (error) {
      console.log(error);
    });
  };

  render() {
    const { loading, generateSummary, summary, videoUrl } = this.state;

    return (
      <>
        {loading && (
          <div className="loading-container">
            <img src="images/infinity_gif.svg" alt="Loading..." />
          </div>
        )}
        <div style={{ width: "90%", margin: "0 auto" }}>
          {videoUrl && (
            <video controls style={{ width: "100%" }}>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <Container>
          <Row>
            <Col
              xs={12}
              md={6}
              className="d-none d-md-flex align-items-center justify-content-center"
            >
              {!generateSummary ? (
                <Image src="images/learn_image.svg"></Image>
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
                  <h1>Learn</h1>
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
                  <button
                    className="assessment-send-button"
                    onClick={this.fetchVideo}
                  >
                    {loading ? "Loading..." : "Generate Video"}
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Button
          className="new"
          onClick={() => {
            localStorage.removeItem("current_topic");
            localStorage.removeItem("input");
            window.location.reload();
          }}
        >
          <CgAddR size={40} />
        </Button>
      </>
    );
  }
}

export default GenerateNotesVideo;
