import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

function ResetPassword() {
    let params=useParams()
    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const [value, setValue] = useState({
        password: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const {password} = value;
            const  data  = await axios.post(`http://localhost:8080/resetpassword/${params.id}/${params.token}`, {
                password
            })
            if (data.data.status !== true) {
                toast.error(data.data.message, toastOptions);
            }
            if (data.data.status === true) {
                toast.success(data.data.message, toastOptions);
            }
        };
    };
    const handleValidation = () => {
        const { password} = value;
        if (password === "") {
            toast.error(
                "Password is required",
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
                <h1 className="mb-3">Reset Password</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div class="form-group mb-2">
                        <input type="password" placeholder='Password' name="password" onChange={(e) => handleChange(e)}/>
                    </div>
                    <input type="submit" class="form-control btn btn-primary btn-sm mb-3" value={"Reset"} />
                </form>
                <p>
                    By entering your data, you're agreeing to our <span>Terms of Service and Privacy Policy</span>.Thanks!
                </p>
                <ToastContainer />
            </div>
  )
}

export default ResetPassword