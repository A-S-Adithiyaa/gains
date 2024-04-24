import React, { useState, useEffect } from "react";
import { consoleText } from "./TypingAnimation";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { IoIosSend } from "react-icons/io";
import session from "../../Variables";

toast.configure();

function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    dob: "",
  });
  const [otp, setOtp] = useState(null);
  const [id, setId] = useState(null);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate("");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Call the consoleText function with the specified parameters
    consoleText(["GAINS", "AN ONLINE TUTOR", "JUST FOR YOU"], "text", [
      "tomato",
      "rebeccapurple",
      "lightblue",
    ]);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form data
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    axios
      .post(session.springbootBaseUrl + "create-users", formData)
      .then(function (response) {
        console.log(response);
        if (response.data !== "Account created") {
          throw new Error(response.data);
        }
        toast("Account Created");
        navigate("/login");
      })
      .catch(function (error) {
        console.error("Sign up failed:", error);

        // Show error toast
        toast.error("Sign up failed. Please try again later.");
      });
    setIsLoading(false);

    //   try {
    //     const response = await fetch("https://localhost:8080/jpa/create-users", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(formData),
    //     });

    //     if (!response.ok) {
    //       throw new Error("Failed to sign up");
    //     }

    //     // Handle successful sign-up
    //     console.log("Sign up successful!");

    //     // Show success toast
    //     toast.success("Sign up successful!");
    //   } catch (error) {
    //     // Handle API call errors
    //     console.error("Sign up failed:", error);

    //     // Show error toast
    //     toast.error("Sign up failed. Please try again later.");
    //   } finally {
    //     setIsLoading(false);
    //   }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;

    // Validate first name
    if (!formData.firstName.trim()) {
      toast.error("Please enter your first name");
      isValid = false;
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      toast.error("Please enter your last name");
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      isValid = false;
    }

    // Validate password
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      isValid = false;
    }

    // Validate date of birth
    if (!isValidDate(formData.dob)) {
      toast.error("Please enter a valid date of birth");
      isValid = false;
    }

    // Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      isValid = false;
    }

    return isValid;
  };

  // Function to check if the date is valid and prior to the current date
  const isValidDate = (dateString) => {
    const today = new Date();
    const dob = new Date(dateString);
    return dob instanceof Date && !isNaN(dob) && dob < today;
  };

  const send_otp = (e) => {
    axios
      .post(session.springbootBaseUrl + "verify-email", {
        email: formData.email,
      })
      .then((response) => {
        setId(response.data);
      })
      .catch((error) => console.log(error));
    countdownTimer(60);
    function countdownTimer(counter) {
      if (counter >= 0) {
        setTimeout(function () {
          setTimer(counter);
          countdownTimer(counter - 1);
        }, 1000);
      } else {
        setId(null);
        toast("OTP expired");
      }
    }
    e.preventDefault();
  };

  const verify_otp = () => {
    axios
      .post(session.springbootBaseUrl + id + "/verify-otp", {
        otp: otp,
      })
      .then((response) => setVerified(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div>
          <div class="console-container">
            <span id="text"></span>
            <div class="console-underscore" id="console">
              &#95;
            </div>
          </div>
          <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Sign Up</h3>
                <div className="text-center">
                  Not registered yet?{" "}
                  <span className="link-primary">
                    <a href="#/login">Sign In</a>
                  </span>
                </div>
                <div className="form-group mt-3">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control mt-1"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control mt-1"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    className="form-control mt-1"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    className="form-control mt-1"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>OTP</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="OTP"
                  />
                </div>
                {!verified && (
                  <Button
                    variant="success"
                    className="form-control mt-1"
                    disabled={id == null && timer != 0}
                    onClick={(e) => {
                      id ? verify_otp(e) : send_otp(e);
                    }}
                  >
                    {id ? "Verify OTP" : timer == 0 ? "Send OTP" : timer}
                  </Button>
                )}
                {verified && (
                  <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-primary">
                      {isLoading ? "Signing up..." : "Submit"}
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="login-right">
        <img src="images/gains-logo-with-name.svg" alt="GIF" />
      </div>
    </div>
  );
}

export default SignUpPage;
