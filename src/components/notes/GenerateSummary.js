import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { CgAddR } from "react-icons/cg";
import "./notes.css";

class GenerateQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: localStorage.getItem("input") || "",
      loading: false,
      generateSummary: false,
      summary: [],
      title: "",
      tid: localStorage.getItem("current_topic"),
      id: localStorage.getItem("isLoggedIn"),
    };
  }

  componentDidMount() {
    if (this.state.tid != null) {
      axios
        .get(
          "http://localhost:8080/jpa/" +
            localStorage.getItem("current_topic") +
            "/get-notes"
        )
        .then((response) => {
          this.setState({
            summary: response.data.split(".|"),
            generateSummary: true,
          });
          console.log(response);
        })
        .catch((error) => console.log(error));
    }
  }

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
        .post("http://10.100.50.225:5000/generate-title", {
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
      .post("http://10.100.50.225:5000/generate_summary", {
        context: this.state.input,
      })
      .then((response) => {
        this.setState({
          loading: false,
          generateSummary: true,
          summary: response.data,
        });
        console.log(response.data);
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

  // handleSubmit = async () => {
  //   this.setState({ loading: true });
  //   const id=localStorage.getItem('isLoggedIn')
  //   const { input } = this.state;
  //   const title_res = await axios.post(
  //     "http://localhost:5000/generate-title",
  //     {
  //       context: input,
  //     }
  //   );
  //   console.log(title_res.data);
  //   this.setState({
  //     title: title_res.data,
  //     loading:false
  //   });

  //     fetch("http://localhost:8080/jpa/"+id+"/create-topics",{
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({"topic":title_res.data.title}),
  //     })
  //       .then(res=>{
  //           return res.json();
  //       })
  //       .then(data=>{
  //         localStorage.setItem('current_topic', data);
  //         this.setState({
  //           tid:data
  //         })
  //          console.log(data)
  //          this.setState({
  //           loading:false
  //         });

  //       })
  //       .catch(function (error) {

  //           console.log(error);
  //       });

  // const response = await axios.post(
  //   "http://localhost:5000/generate_summary",
  //   {
  //     context: input,
  //   }
  // );
  // this.setState({
  //   loading: false,
  //   generateSummary: true,
  //   summary: response.data,
  // })

  // axios.post("http://localhost:5000/generate_summary",
  // {
  //   context: input,
  // })
  // .then((response)=>this.setState({
  //   loading: false,
  //   generateSummary: true,
  //   summary: response.data,
  // }))
  // .then(()=>{
  //   console.log(this.state.summary)
  //   console.log(this.state.tid)
  // })
  // fetch("http://localhost:8080/jpa/"+this.state.tid+"/create-notes",{
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({"topic":this.state.title,
  //                         "content":this.state.input,
  //                         "summary":"awawerhpiufnq;ijfbp3gwqifiqwhefp3yg  ;iwbwegqubqih4ygief;wejpqijflfge9ruhawjfdghpq3gliejfuf;eug"
  //                       }),
  // })
  //     .then(res=>{
  //         return res.json();
  //     })
  //     .then(data=>{
  //       localStorage.setItem('current_topic', data);
  //        console.log(data)
  //        this.setState({
  //         loading:false
  //       });

  //     })
  //     .catch(function (error) {

  //         console.log(error);
  //     });

  // };

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
                  <Button
                    className="assessment-send-button"
                    variant="primary"
                    onClick={this.handleSubmit}
                  >
                    {loading ? "Loading..." : "Generate Notes"}
                  </Button>
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
    );
  }
}

export default GenerateQuestions;
