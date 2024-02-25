import React from "react";
import "./History.css";
import { useState } from "react";


const History = () => {
    const [option,setOption]=useState("");
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
                        <input type="radio" class="radio-button" name="radio-group" value="Today" /><span >Today</span>  
                            <input type="radio" class="radio-button" name="radio-group" value="Yesterday" /><span >Yesterday</span>
                            <input type="radio" class="radio-button" name="radio-group" value="This Week" /><span >This Week</span>
                            <input type="radio" class="radio-button" name="radio-group" value="This Month" /><span >This Month</span>
                            <input type="radio" class="radio-button" name="radio-group" value="All" /><span >All</span>
                        </div>


                        <div className="his_table">
                        <div class="radio-buttons">
  <button id="option1" class="radio-button" name="radio-group" value="option1">Option 1</button>
  <button id="option2" class="radio-button" name="radio-group" value="option2">Option 2</button>
  <button id="option3" class="radio-button" name="radio-group" value="option3">Option 3</button>
</div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default History;