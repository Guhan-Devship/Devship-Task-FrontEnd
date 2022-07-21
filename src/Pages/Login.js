import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, email } = value;
      const data = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
      if (data.data.message !== "login successfully") {
        toast.error(data.data.message, toastOptions);
      }
      if (data.data.message === "login successfully") {
        window.localStorage.setItem("myapptoken", data.data.token);
        window.localStorage.setItem("user", data.data.user.name);
        window.localStorage.setItem("mobile", data.data.user.mobile);
        window.localStorage.setItem("id", data.data.user._id);
        let storageData = JSON.parse(localStorage.getItem("cartList"));
        if (!storageData) {
          navigate("/");
        } else {
          for (var i = 0; i < storageData.length; i++) {
            if (localStorage.getItem("myapptoken")) {
              axios.post("http://localhost:8080/createCart", storageData[i], {
                headers: {
                  Authorization: window.localStorage.getItem("myapptoken"),
                },
              });
              navigate("/cart");
            } else {
              navigate("/");
            }
          }
        }
      }
    }
  };
  const handleValidation = () => {
    const { password, email } = value;
    if (password === "") {
      toast.error("Email and Password is required", toastOptions);
      return false;
    } else if (email.length === "") {
      toast.error("Email and Password is required", toastOptions);
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="phone-container">
        <h1 className="mb-3">Login</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div class="form-group mb-2">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
              min="3"
            />
          </div>
          <div class="form-group mb-2">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <input
            type="submit"
            class="form-control btn btn-primary btn-sm mb-3"
            value={"Login"}
          />
          <div>
            <p className="forgot-font">
              <Link to={"/forgotPassword"}>Forgot password?</Link>
            </p>
          </div>
        </form>
        <p>
          By entering your data, you're agreeing to our{" "}
          <span>Terms of Service and Privacy Policy</span>.Thanks!
        </p>
        <span>
          Don't have account? <Link to={"/register"}>Register</Link>
        </span>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
