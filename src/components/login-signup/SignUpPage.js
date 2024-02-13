import React, { useState, useEffect } from "react";
import { consoleText } from "./TypingAnimation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    phoneNumber: "",
  });

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

    try {
      const response = await fetch("https://api.example.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      // Handle successful sign-up
      console.log("Sign up successful!");

      // Show success toast
      toast.success("Sign up successful!");
    } catch (error) {
      // Handle API call errors
      console.error("Sign up failed:", error);

      // Show error toast
      toast.error("Sign up failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
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
    if (!phoneRegex.test(formData.phoneNumber)) {
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
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                  />
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-primary">
                    {isLoading ? "Signing up..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="login-right">
        <img src="images/gains.gif" alt="GIF" />
      </div>
    </div>
  );
}

export default SignUpPage;
