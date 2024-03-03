import React,{ useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { IoIosSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const ResetPassword = () => {

    const [password,setPassword]=useState("");
    const [conPassword,setConPassword]=useState("");
    const [email,setEmail]=useState("");
    const [otp,setOtp]=useState();
    const [verified,setVerified]=useState(false);
    const [id,setId]=useState();
    const navigate=useNavigate("");
    const  [timer,setTimer]=useState(0);
    const [changeEmail,setChangeEmail]=useState(false)
  

    const send_otp=(e)=>{
        setChangeEmail(false);
        axios.post("http://localhost:8080/jpa/forgot-password",
        {
            email:email
        })
        .then(response=>{
            if(response.data===-1){
                toast('User does not exist');
                setChangeEmail(true);
            }
            else{
                setId(response.data)
                countdownTimer(60)

            }
        })
        .catch(error=>console.log(error));

        
        function countdownTimer(counter) {
            if (counter >= 0) {
                setTimeout(function() {
                
                setTimer(counter)
                countdownTimer(counter - 1);
              }, 1000);
            }
            else{
                toast("OTP expired");
            }
          }
        e.preventDefault();
    }

    const verify_otp=()=>{
        axios.post("http://localhost:8080/jpa/"+id+"/verify-otp",
        {
            "otp":otp
        })
        .then(response=>{
            setVerified(response.data)
            if(!response.data){
                toast('Wrong OTP')
            }
        })
        .catch(error=>console.log(error));
    }

    const resetPassword=()=>{
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }
        else{
            if(password!=conPassword){
                toast.error("Passwords doesn't match");
            return;
            }
        }

        axios.post("http://localhost:8080/jpa/reset-password",
        {
            email:email,
            password:password
        })
        .catch(error=>console.log(error));

        navigate("/login")
    }

    return ( 
        <div className="reset_body">
            {verified?<div className="reset_box">
                <form onSubmit={resetPassword}>
                    <div>
                        <label className="label">Password</label><br/>
                        <input type="password" className="inputs" placeholder="New Password" value={password} onChange={(e)=>setPassword(e.target.value)}/><br/><br/>
                    </div>
                    <div>
                        <label className="label">Confirm Password</label><br/>
                        <input type="password" className="inputs" placeholder="Confirm Password" value={conPassword} onChange={(e)=>setConPassword(e.target.value)}/><br/><br/>
                    </div>
                    <Button variant="success" id="inputs" type="submit" className="reset_btn">
                            Submit
                    </Button>
                </form>
            </div>:
            <div className="reset_box">
                <div>
                    <form onSubmit={send_otp}>
                        <label className="label">Email</label><br/>
                        <div className="reset_row">
                            <input type="text" className="inputs" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <Button variant="success" type="submit" className="reset_btn" disabled={timer!=0 & !changeEmail}>
                                 {timer==0||changeEmail?"Send OTP":timer}
                            </Button>                            
                        </div>
                    </form>
                </div>    
                <br/>
                <div>
                    <form onSubmit={verify_otp}>
                    <label className="label">OTP</label><br/>
                        <div className="reset_row">                            
                            <input type="text" className="inputs" placeholder="OTP" value={otp} onChange={(e)=>setOtp(e.target.value)}/>
                            <Button variant="success" type="submit" className="reset_btn">
                                <IoIosSend />
                            </Button>
                        </div>
                        
                    </form>
                </div>
                
            </div>
            
            }
        </div>
     );
}
 
export default ResetPassword;