import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { CgAddR } from "react-icons/cg";
import VideoPlayer from "./VideoPlayer";
import session from "../../Variables";
// import Video_path from "../../../backend/TutorialVideo.mp4";
// import "./notes.css";

class GenerateNotesVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: localStorage.getItem("input") || "",
      loading: false,
      generateSummary: false,
      videoUrl: "",
      summary: [
        "The fielding team tries to prevent runs from being scored by dismissing batters (so they are 'out')",
      ],
      showVideo: false,
      title: "",
      tid: localStorage.getItem("current_topic"),
      id: localStorage.getItem("isLoggedIn"),
      video: null,
    };
  }

  // fetchVideo = (e) => {
  //   e.preventDefault(); // Prevent default form submission behavior

  //   const { input } = this.state;
  //   // Define your API endpoint
  //   const apiUrl = "http://localhost:5000/generate_learn_video"; // Update with your actual API endpoint

  //   // Update state to indicate fetching
  //   this.setState({ loading: true });

  //   // Make the API call to fetch the video
  //   axios
  // .post(apiUrl, {
  // context: [
  //   "The fielding team tries to prevent runs from being scored by dismissing batters (so they are 'out')",
  // ],
  // })
  //     .then((response) => {
  //       console.log(response);
  //       // Assuming the response contains the video URL
  //       this.setState({
  //         showVideo: true,
  //         loading: false,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching video:", error);
  //       this.setState({ loading: false });
  //     });
  // };

  generateSumm = () => {
    this.setState({ loading: true });
    axios
      .post(session.naqBaseAPIUrl + "generate_summary", {
        context: this.state.input,
      })
      .then((response) => {
        this.setState({
          summary: response.data,
        });
        this.fetchVideo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching summary:", error);
      });
  };

  fetchVideo = (videosummary) => {
    axios
      .post(
        session.videoGenerationCompleteAPIUrl,
        {
          context: videosummary,
        },
        {
          headers: {
            Accept: "video/mp4",
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        this.setState({
          video: response,
        });
        axios
          .post(
            session.springbootBaseUrl +
              localStorage.getItem("current_topic") +
              "/create-video",
            {
              topic: localStorage.getItem("topic"),
              content: this.state.summary,
            }
          )
          .then((res) => {
            console.log(this.state.video);
            console.log(response);
            const formdata = new FormData();
            formdata.append("file", response);

            console.log(formdata);

            axios
              .put(
                session.springbootBaseUrl + res.data + "/create-video",
                formdata,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              )
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
        const url = URL.createObjectURL(response.data);
        this.setState({ videoUrl: url, loading: false });
      })
      .catch((error) => console.error("Error fetching video:", error));
  };

  render() {
    const { loading, videoUrl } = this.state;

    return (
      <>
        {loading && (
          <div className="loading-container">
            <img src="images/infinity_gif.svg" alt="Loading..." />
          </div>
        )}
        <div style={{ width: "90%", margin: "0 auto" }}>
          {videoUrl && (
            <video controls style={{ width: "100%", maxHeight: "90vh" }}>
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
              <Image src="images/learn_image.svg"></Image>
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
                <Col xs={6} className="text-center">
                  <button
                    className="assessment-cancel-button "
                    onClick={() => {
                      localStorage.removeItem("current_topic");
                      localStorage.removeItem("input");
                      window.location.reload();
                    }}
                  >
                    Clear
                  </button>
                </Col>
                <Col xs={6} className="text-center">
                  <button
                    className="assessment-send-button"
                    onClick={this.generateSumm}
                  >
                    {loading ? "Loading..." : "Generate Video"}
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        {/* <Button
          className="new"
          onClick={() => {
            localStorage.removeItem("current_topic");
            localStorage.removeItem("input");
            window.location.reload();
          }}
        >
          <CgAddR size={40} />
        </Button> */}
      </>

      // <VideoPlayer />
    );
  }
}

export default GenerateNotesVideo;
