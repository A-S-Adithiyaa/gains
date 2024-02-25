import React, { useEffect, useState } from "react";
import { consoleText } from "./TypingAnimation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formData = {
    email: email,
    password: password,
  };
  const navigate = useNavigate("");

  useEffect(() => {
    // Call the consoleText function with the specified parameters
    consoleText(["GAINS", "AN ONLINE TUTOR", "JUST FOR YOU"], "text", [
      "tomato",
      "rebeccapurple",
      "lightblue",
    ]);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate email and password
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Please enter a valid password");
      return;
    }

    setIsLoading(true);

    axios
      .post("http://localhost:8080/jpa/login", formData)
      .then(function (response) {
        if (response.data[0] === "Authorized") {
          toast("Successfully Logged In");
          localStorage.setItem("isLoggedIn", response.data[1]);
          navigate("/");
          setEmail("");
          setPassword("");
        } else {
          setIsLoading(false);
          toast(response.data[0]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // Perform the API call
    //   fetch("http://localhost:8080/jpa/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: email,
    //       password: password,
    //     }),
    //   })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error("Failed to login");
    //       }
    //       return response.json();
    //     })
    //     .then((data) => {
    //       // Handle successful login
    //       console.log("Login successful:", data);
    //     })
    //     .catch((error) => {
    //       setError(error);
    //     })
    //     .finally(() => {
    //       setIsLoading(false);
    //     });
  };

  console.log("Hello, World!");

  const validateEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password validation: at least 6 characters
    return password.length >= 6;
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
                <h3 className="Auth-form-title">Sign In</h3>
                <div className="text-center">
                  Not registered yet?{" "}
                  <span className="link-primary">
                    <a href="#/signup">Sign Up</a>
                  </span>
                </div>
                <div className="form-group mt-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-primary">
                    {isLoading ? "Logging in..." : "Submit"}
                  </button>
                </div>
                <p className="text-center mt-2">
                  Forgot <a href="#">password?</a>
                </p>
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

export default LoginPage;
