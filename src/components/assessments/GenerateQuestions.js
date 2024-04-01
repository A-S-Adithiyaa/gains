import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import axios from "axios";
import QuestionCard from "./components/QuestionCard";
import { MainApp } from "./components/PageElements/MainApp";
import { theme } from "./data/AppTheme";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { CgAddR } from "react-icons/cg";
import "../notes/notes.css";
import { Link } from "react-router-dom";
import "./ar.css";
import { GoArrowUpRight } from "react-icons/go";

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
      input: localStorage.getItem("input") || "",
      loading: false,
      takeAssessment: false,
      questionsAndAnswers: [],
      quiz:[]
    };
  }

  componentDidMount(){
    axios.get("http://localhost:8080/jpa/"+localStorage.getItem("current_topic")+"/get-quiz")
    .then(res=> res.data)
    .then(res=>{
        this.setState({
          quiz:res
        })
        console.log(res)
    })
    .catch(err=>console.log(err))
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

    if (localStorage.getItem("current_topic")=== null) {
      await axios
        .post("http://localhost:5000/generate-title", {
          context: input,
        })
        .then((response) => {
          this.setState({
            title: response.data.title,
            loading: false,
          });

          localStorage.setItem("topic",response.data.title)

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
              console.log(data)
              localStorage.setItem("current_topic", data);
              this.generate(data);
              this.setState({
                tid: data,
              });
              this.setState({
                loading: false,
              });
             
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      }
      else{
          this.generate(localStorage.getItem("current_topic"))
      }

    
    
  }

  generate=async (data)=>{
    const { input } = this.state;

    axios.post("http://localhost:8080/jpa/"+data+"/create-quiz",{
      topic:localStorage.getItem("topic")
    })
    .then(response=>
      localStorage.setItem("quiz",response.data)
      )
    .catch(error=>console.log(error))

    const response = await axios.post("http://localhost:5000/generate_qa", {
      context: input,
    });
    // console.log(response.data);
    this.setState({
      loading: false,
      takeAssessment: true,
      questionsAndAnswers: response.data,
    });

    // create_questions(response.data)
    console.log(response.data)
    this.create_questions(response.data)
  };


  
  create_questions(questions_answers){
    var correct=[]
    questions_answers.map((qa)=>{
      var options=[]
      qa['answers'].map((ans)=>{
        options.push(ans['answerText'])
        if(ans['isCorrect']==true){
          correct.push(qa.answers.indexOf(ans))
        }
      })
      console.log(options)
      axios.post("http://localhost:8080/jpa/"+localStorage.getItem("quiz")+"/create-questions",{
      question:qa['question'],
      option1:options[0],
      option2:options[1],
      option3:options[2],
      option4:options[3],
    })
    .catch(error=>console.log(error))

    })
    console.log(correct)
    console.log(questions_answers)
    axios.put("http://localhost:8080/jpa/"+localStorage.getItem("quiz")+"/edit-quiz",{
      correctAnswers:correct
    })
    .catch(error=>console.log(error))
  }

  render() {
    const { loading, takeAssessment, questionsAndAnswers } = this.state;
    return (
      <>
        {loading && (
          <div className="loading-container">
            <img src="images/infinity_gif.svg" alt="Loading..." />
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
                <Image src="images/assessment_image.svg"></Image>
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
                    <button
                      className="assessment-send-button"
                      onClick={this.handleSubmit}
                    >
                      {loading ? "Loading..." : "Send"}
                    </button>
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
        {!questionsAndAnswers && (
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
          
        )}
        
        {this.state.quiz&&<div className="qhistab">
          <div className="qhis">
            <div className="qtab">
              <div className="qhead">Sl No.</div>
              <div className="qhead">Title</div>
              <div className="qhead">Score</div>
              <div className="qhead">Timestamp</div>
              <div className="qhead">Review</div>
            </div>
            {this.state.quiz.map((qui,index)=>(
              
              <div className="qtab">
              <div className="qbody">{index+1}.</div>
              <div className="qbody" >{qui.topic+" - "+(index+1)}</div>
              <div className="qbody">{qui.marksScored+"/"+qui.totalMarks}</div>
              <div className="qbody">{qui.timestamp.slice(0,10)+"  ,  "+ qui.timestamp.slice(11,19)}</div>
              <Link className="link" to={`/review/${qui.id}`}><Button className="review_b"><GoArrowUpRight size="25%" /></Button></Link>
            </div>
            ))
            
            }
          </div>
        </div>}
      </>
    );
  }
}

export default GenerateQuestions;
