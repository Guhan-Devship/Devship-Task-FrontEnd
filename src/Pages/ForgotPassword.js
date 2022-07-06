import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

function ForgotPassword() {
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
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { email } = value;
            const  data  = await axios.post("http://localhost:8080/forgotpassword", {
                email,
            })
            if (data.data.status !== true) {
                toast.error(data.data.message, toastOptions);
            }
            if (data.data.status === true) {
                alert(data.data.message);
                window.close();
            }
        };
    };
    const handleValidation = () => {
        const { email } = value;
         if (email.length === "") {
            toast.error(
                "Email  is required",
                toastOptions
            );
            return false;
        }
        return true;
    };
    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }
    return (
        <div className="phone-container">
            <h1 className="mb-3">Enter Mail Id</h1>
            <form onSubmit={(e) => handleSubmit(e)} >
                <div class="form-group mb-2">
                    <input type="email" placeholder='Email' name="email" onChange={(e) => handleChange(e)} />
                </div>
                <input type="submit" class="form-control btn btn-primary btn-sm mb-3" value={"Send Link"} />
            </form>
            <p>
                By entering your data, you're agreeing to our <span>Terms of Service and Privacy Policy</span>.Thanks!
            </p>
            <ToastContainer />
        </div>
    )
}

export default ForgotPassword