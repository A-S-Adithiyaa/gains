import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row,Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import session from "../../Variables";
const AssessmentReview = () => {

    let {qid}=useParams();
    const [score,setScore]=useState();
    const [total,setTotal]=useState();
    const [correct,setCorrect]=useState([]);
    const [selected,setSelected]=useState([]);
    const [questions,setQuestions]=useState([]);

    useEffect(()=>{
        axios.get(session.springbootBaseUrl+localStorage.getItem("current_topic")+"/get-quiz/"+qid)
        .then(res=> res.data)
        .then(res=>{
            setCorrect(res.correctAnswers)
            setSelected(res.selectedAnswers)
            setScore(res.marksScored)
            setTotal(res.totalMarks)
            console.log(res)
        })
        .catch(err=>console.log(err))

        axios.get(session.springbootBaseUrl+qid+"/get-questions")
        .then(res=>{
            setQuestions(res.data)
            console.log(res.data)
        })
        .catch(err=>console.log(err))
    },[])

    return ( 
        <div>
            <Container>
                <Row xs={12} className="text-center">
                    <h1>Attempt 1</h1><br/>
                    <h2>{score} / {total}</h2>
                </Row>
                {
                    questions.map((que,index)=>
                    (<Col>
                            <Row className="questions">{index+1}. {que.question}</Row>
                            {que.option1&&<Row className="options" style={0===correct[index]?{color:"white", backgroundColor:"green", borderColor:"green"}:0==selected[index]&&selected[index]!=correct[index]?{color:"white", backgroundColor:"red", borderColor:"red"}:{}}>{que.option1}</Row>}
                            {que.option2&&<Row className="options" style={1===correct[index]?{color:"white", backgroundColor:"green", borderColor:"green"}:1==selected[index]&&selected[index]!=correct[index]?{color:"white", backgroundColor:"red", borderColor:"red"}:{}}>{que.option2}</Row> } 
                            {que.option3&&<Row className="options" style={2===correct[index]?{color:"white", backgroundColor:"green", borderColor:"green"}:2==selected[index]&&selected[index]!=correct[index]?{color:"white", backgroundColor:"red", borderColor:"red"}:{}}>{que.option3}</Row>}
                            {que.option4&&<Row className="options" style={3===correct[index]?{color:"white", backgroundColor:"green", borderColor:"green"}:3==selected[index]&&selected[index]!=correct[index]?{color:"white", backgroundColor:"red", borderColor:"red"}:{}}>{que.option4}</Row>}
                    </Col>
                    ))
                }
            </Container>
        </div>
     );
}
 
export default AssessmentReview;