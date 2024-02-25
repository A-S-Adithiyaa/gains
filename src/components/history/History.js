import React from "react";
import "./History.css";
import { useState } from "react";


const History = () => {
    const [option,setOption]=useState("");
    const date=new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1; 
    var day = date.getDate();

    var action=[
        {
            "id":0,
            "title":"Python",
            "actions":[true,false,true,true]
        },
        {   
            "id":1,
            "title":"C",
            "actions":[true,true,false,false]
        },
        {
            "id":2,
            "title":"Java",
            "actions":[false,false,true,true]
        },
        {
            "id":3,
            "title":"Html",
            "actions":[false,false,true,false]
        }
    ]

    
    return ( 
        <div>
            <div className="his_back">
                <div className="his_body">
                    <h1 className="his_head">Search History</h1>
                    <div className="his_buttons"> 
                        <button className="his_bbutton" type="button">Back</button>
                        <input className="his_search" type="text" placeholder="Search"/>
                    </div>
                    <div className="his_grid">
                        <div class="radio-buttons" >
                            <p id="radio" className={option=="Today"?"underline":""} onClick={()=>setOption("Today")}>Today</p>
                            <p id="radio" className={option=="Yesterday"?"underline":""} onClick={()=>setOption("Yesterday")}>Yesterday</p>
                            <p id="radio" className={option=="This Week"?"underline":""} onClick={()=>setOption("This Week")}>This Week</p>
                            <p id="radio" className={option=="This Month"?"underline":""} onClick={()=>setOption("This Month")}>This Month</p>
                            <p id="radio" className={option=="All"?"underline":""} onClick={()=>setOption("All")}>All</p>
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

                                {action.map((act)=>(
                                    
                                    <div className={act.id%2==0?"grid_table-dark":"grid_table-light"}>
                                        <input className="checkbox" type="checkbox"></input>
                                        <div className="titles">{act.title}</div>
                                        <div>
                                            {act.actions[0]?<button className={act.id%2==0?"but-light":"but-dark"}>Learn</button>:""}
                                            {act.actions[1]?<button className={act.id%2==0?"but-light":"but-dark"}>Notes</button>:""}
                                            {act.actions[2]?<button className={act.id%2==0?"but-light":"but-dark"}>Doubts</button>:""}
                                            {act.actions[3]?<button className={act.id%2==0?"but-light":"but-dark"}>Test</button>:""}   
                                        </div>
                                        <div>
                                            {act.actions[0]?"":<button className={act.id%2==0?"but-light":"but-dark"}>Learn</button>}
                                            {act.actions[1]?"":<button className={act.id%2==0?"but-light":"but-dark"}>Notes</button>}
                                            {act.actions[2]?"":<button className={act.id%2==0?"but-light":"but-dark"}>Doubts</button>}
                                            {act.actions[3]?"":<button className={act.id%2==0?"but-light":"but-dark"}>Test</button>}
                                        </div>
                                    </div>    
                                ))
                                    
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default History;