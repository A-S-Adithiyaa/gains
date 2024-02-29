import React, { useEffect } from "react";
import "./History.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const History = () => {
    const [option,setOption]=useState("");
    const date=new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1; 
    var day = date.getDate();
    if(month<10){
        month="0"+month;
    }
    const yest=new Date(date);
    yest.setDate(date.getDate()-1);
    var yyear = yest.getFullYear();
    var ymonth = yest.getMonth() + 1; 
    var yday = yest.getDate();
    if(ymonth<10){
        ymonth="0"+ymonth;
    }

    const diff=day-date.getDay()
    const week=new Date(date.setDate(diff))
    var wday=week.getDate();
    var wmonth=week.getMonth()+1;
    var wyear=week.getFullYear();
    if(wmonth<10){
        wmonth="0"+wmonth;
    }






    const navigate=useNavigate("");
    const id=localStorage.getItem("isLoggedIn");
    const [action,setAction]=useState([]);
    const [topics,setTopics]=useState([]);
    const [filter,setFilter]=useState([]);
    const [search,setSearch]=useState("");
    const [del,setDel]=useState(false);
    const [refresh,setRefresh]=useState(0);
    // var action=[
    //     {
    //         "id":0,
    //         "title":"Python",
    //         "actions":[true,false,true,true]
    //     },
    //     {   
    //         "id":1,
    //         "title":"C",
    //         "actions":[true,true,false,false]
    //     },
    //     {
    //         "id":2,
    //         "title":"Java",
    //         "actions":[false,false,true,true]
    //     },
    //     {
    //         "id":3,
    //         "title":"Html",
    //         "actions":[false,false,true,false]
    //     }
    // ]

    useEffect(()=>{

        const isLoggedIn = localStorage.getItem("isLoggedIn");

    
        if (!isLoggedIn) {
            navigate("/login");
            }

        fetch("http://localhost:8080/jpa/"+id+"/get-topics")
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            console.log(data);
            setTopics(data);
            setAction(data)
        
        })
        .catch(function (error) {
            
            console.log(error);
        });
    },[refresh])

    useEffect(()=>{
        setFilter([])
        setSearch("")
        if(option==="All"){
            setAction(topics);
        }
        else if(option==="Today"){
            setAction([]);
            topics.map((topic)=>{
                if(topic.timestamp.slice(0,10)===year+"-"+month+"-"+day){
                    setAction(action=>[...action,topic])
                    console.log(action)
                }
            })
        }
        else if(option==="Yesterday"){
            setAction([]);
            topics.map((topic)=>{
                console.log(topic.timestamp.slice(0,10),yyear+"-"+ymonth+"-"+yday)
                if(topic.timestamp.slice(0,10)===yyear+"-"+ymonth+"-"+yday){
                    setAction(action=>[...action,topic])
                    console.log(action)
                }
            })
        }
        else if(option==="This Month"){
            setAction([]);
            topics.map((topic)=>{
                console.log(topic.timestamp.slice(0,7),year+"-"+month)
                if(topic.timestamp.slice(0,7),year+"-"+month){
                    setAction(action=>[...action,topic])
                    console.log(action)
                }
            })
        }
        else if(option==="This Week"){
            setAction([]);
            
            var thisWeek=new Date(wyear+"-"+wmonth+"-"+wday);
            topics.map((topic)=>{
                var topicdate=new Date(topic.timestamp.slice(0,10));
                console.log(topicdate,thisWeek)
                if(topicdate>=thisWeek){
                    setAction(action=>[...action,topic])
                    console.log(action)
                }
            })
        }
    },[option]);

    const filterHistory=(e)=>{
        setSearch(e.target.value)
        console.log(e.target.value)
        let regex = new RegExp(`^${e.target.value}`, "i"); 
        setFilter([]);
        action.map((act)=>{
            console.log(regex.test(act.topic))
            if(regex.test(act.topic)){
                setFilter(filter=>[...filter,act])
                
            }
        })
        console.log(filter)


    }

    const [checks,setChecks]=useState([]);

    const handleDelete= async ()=>{
        try {
            
            const response = await fetch("http://localhost:8080/jpa/delete-topics", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(checks)
            });
      
            const responseData = await response.text();
            toast(responseData)
            setDel(false)
            refresh===0?setRefresh(1):setRefresh(0)
            setChecks([])
          } catch (error) {
            console.error('Error sending data to backend:', error);
          }
        
    }

    
    return ( 
        <div>
            <div className="his_back">
               <div className="his_body">
                    <h1 className="his_head">Search History</h1>
                    <div className="his_buttons"> 
                        <button className="his_bbutton" type="button" onClick={()=> navigate(-1)}>Back</button>
                        <input className="his_search" type="text" placeholder="Search" value={search} onChange={(e)=>filterHistory(e)}/>
                    </div>
                    <div className="his_grid">
                        <div class="radio-buttons" >
                            <p id="radio" className={option=="Today"?"underline":""} onClick={()=>setOption("Today")}>Today</p>
                            <p id="radio" className={option=="Yesterday"?"underline":""} onClick={()=>setOption("Yesterday")}>Yesterday</p>
                            <p id="radio" className={option=="This Week"?"underline":""} onClick={()=>setOption("This Week")}>This Week</p>
                            <p id="radio" className={option=="This Month"?"underline":""} onClick={()=>setOption("This Month")}>This Month</p>
                            <p id="radio" className={option=="All"||option==""?"underline":""} onClick={()=>setOption("All")}>All</p>
                            {checks.length>0? <button id="radio" className="his_delete" type='button' onClick={()=>setDel(true)}>Delete</button>:null}
                        </div>
                        <div className="his_table">
                            <p className="today">{"Today " + day + "-" + month + "-" +year}</p>
                            <div className="grid" >
                                <div className="grid_table">
                                    <div className="head"> </div>
                                    <div className="head">Title</div>
                                    <div className="head">Actions Performed</div>
                                    <div className="head">More Actions</div>
                                </div>

                                { filter.length  ===0?action.map((act,index)=>(
                                    
                                    <div className={index%2==0?"grid_table-dark":"grid_table-light"}>
                                        <input className="checkbox" type="checkbox" onChange={(e)=>{
                                            e.target.checked?setChecks(checks=>[...checks,act.id]):setChecks(checks=>checks.filter(item=>item!==act.id))
                                        }}></input>
                                        <div className="titles">{act.topic}</div>
                                        <div>
                                            {act.action[0]?<button className={index%2==0?"but-light":"but-dark"} onClick={()=>{
                                                localStorage.setItem("current_topic",act.id)
                                                navigate("/video")
                                            }}>Learn</button>:""}
                                            {act.action[1]?<button className={index%2==0?"but-light":"but-dark"} onClick={()=>{
                                                localStorage.setItem("current_topic",act.id)
                                                navigate("/notes")
                                            }}>Notes</button>:""}
                                            {act.action[2]?<button className={index%2==0?"but-light":"but-dark"} onClick={()=>{
                                                localStorage.setItem("current_topic",act.id)
                                                navigate("/doubts")
                                            }}>Doubts</button>:""}
                                            {act.action[3]?<button className={index%2==0?"but-light":"but-dark"} onClick={()=>{
                                                localStorage.setItem("current_topic",act.id)
                                                navigate("/assessments")
                                            }}>Test</button>:""}   
                                        </div>
                                        <div>
                                            {act.action[0]?"":<button className={index%2==0?"but-light":"but-dark"} onClick={()=>{
                                                localStorage.setItem("current_topic",act.id)
                                                navigate("/video")
                                            }}>Learn</button>}
                                            {act.action[1]?"":<button className={index%2==0?"but-light":"but-dark"} onClick={()=>{
                                                localStorage.setItem("current_topic",act.id)
                                                navigate("/notes")
                                            }}>Notes</button>}
                                            {act.action[2]?"":<button className={index%2==0?"but-light":"but-dark"} onClick={()=>{
                                                localStorage.setItem("current_topic",act.id)
                                                navigate("/doubts")
                                            }}>Doubts</button>}
                                            {act.action[3]?"":<button className={index%2==0?"but-light":"but-dark"}
                                            onClick={()=>{
                                                localStorage.setItem("current_topic",act.id)
                                                navigate("/assessments")
                                            }}>Test</button>}
                                        </div>
                                    </div>    
                                )):
                                filter.map((act,index)=>(
                                    
                                    <div className={index%2==0?"grid_table-dark":"grid_table-light"}>
                                        <input className="checkbox" type="checkbox" onChange={(e)=>{
                                            e.target.checked?setChecks(checks=>[...checks,act.id]):setChecks(checks=>checks.filter(item=>item!==act.id))
                                        }}></input>
                                        <div className="titles">{act.topic}</div>
                                        <div>
                                            {act.action[0]?<button className={index%2==0?"but-light":"but-dark"} onClick={()=>{
                                                localStorage.setItem("current_topic",act.id)
                                                navigate("/video")
                                            }}>Learn</button>:""}
                                            {act.action[1]?<button className={index%2==0?"but-light":"but-dark"} onClick={()=>{
                                                localStorage.setItem("current_topic",act.id)
                                                navigate("/notes")
                                            }}>Notes</button>:""}
                                            {act.action[2]?<button className={index%2==0?"but-light":"but-dark"} onClick={()=>{
                                                localStorage.setItem("current_topic",act.id)
                                                navigate("/doubts")
                                            }}>Doubts</button>:""}
                                            {act.action[3]?<button className={index%2==0?"but-light":"but-dark"} onClick={()=>{
                                                localStorage.setItem("current_topic",act.id)
                                                navigate("/assessments")
                                            }}>Test</button>:""}   
                                        </div>
                                        <div>
                                            {act.action[0]?"":<button className={index%2==0?"but-light":"but-dark"} onClick={()=>{
                                                localStorage.setItem("current_topic",act.id)
                                                navigate("/video")
                                            }}>Learn</button>}
                                            {act.action[1]?"":<button className={index%2==0?"but-light":"but-dark"} onClick={()=>{
                                                localStorage.setItem("current_topic",act.id)
                                                navigate("/notes")
                                            }}>Notes</button>}
                                            {act.action[2]?"":<button className={index%2==0?"but-light":"but-dark"} onClick={()=>{
                                                localStorage.setItem("current_topic",act.id)
                                                navigate("/doubts")
                                            }}>Doubts</button>}
                                            {act.action[3]?"":<button className={index%2==0?"but-light":"but-dark"}
                                            onClick={()=>{
                                                localStorage.setItem("current_topic",act.id)
                                                navigate("/assessments")
                                            }}>Test</button>}
                                        </div>
                                    </div>    
                                ))
                                    
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {del&&<div className="his_delete_back">
                    <div className="his_del_body">
                        <p>Are you sure you want to delete?</p>
                        <div className="his_del_btns">
                            <button className="his_btns" onClick={()=>{
                                                                        setDel(false)
                                                                        
                                                                        }}>Cancel</button>
                            <button className="his_btns" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                    
                </div>}    
            </div>
        </div>
     );
}
 
export default History;