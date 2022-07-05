import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const [value, setValue] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { password, confirmPassword, name, email, mobile } = value;
            const data = await axios.post("http://localhost:8080/signup", {
                name,
                email,
                mobile,
                password
            })
            if (data.data.message === "Email already exit") {
                toast.error(data.data.message, toastOptions);
            }
            if (data.data.message === "user added sucessfully") {
                toast.success("SuccessFully Created", toastOptions);
                navigate("/");
            }
        };
    };
    const handleValidation = () => {
        const { password, confirmPassword, name, email, mobile } = value;
        if (password !== confirmPassword) {
            toast.error(
                "Password and confirm password should be same.",
                toastOptions
            );
            return false;
        } else if (name.length < 3) {
            toast.error(
                "Username should be greater than 3 characters.",
                toastOptions
            );
            return false;
        } else if (password.length < 8) {
            toast.error(
                "Password should be equal or greater than 8 characters.",
                toastOptions
            );
            return false;
        } else if (email === "") {
            toast.error("Email is required.", toastOptions);
            return false;
        } else if (mobile.length < 10) {
            toast.error(
                "mobile should be 10 numbers.",
                toastOptions
            );
            return false;
        };
        return true;
    };

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="phone-container">
                <h1 className="mb-3">Register</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div class="form-group mb-2">
                        <input type="text" placeholder='Name' name="name" onChange={(e) => handleChange(e)} min="3" />
                    </div>
                    <div class="form-group mb-2">
                        <input type="email" placeholder='Email' name="email" onChange={(e) => handleChange(e)} />
                    </div>
                    <div class="form-group mb-2">
                        <input type="text" placeholder='Mobile' name="mobile" onChange={(e) => handleChange(e)} min="10" />
                    </div>
                    <div class="form-group mb-2">
                        <input type="password" placeholder='Password' name="password" onChange={(e) => handleChange(e)} />
                    </div>
                    <div class="form-group mb-2">
                        <input type="password" placeholder='Confirm Password' name="confirmPassword" onChange={(e) => handleChange(e)} />
                    </div>
                    <input type="submit" class="form-control btn btn-primary btn-sm mb-3" value={"Register"} />

                </form>
                <span>Already have account? <Link to={"/"}>Login</Link></span>
                <ToastContainer />
            </div>

        </>
    )
}

export default Register