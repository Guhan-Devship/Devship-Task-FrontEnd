import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../Navbar";

function NewAddress() {
  let navigate = useNavigate();
  let userId = localStorage.getItem("id");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [newaddress, setNewAddress] = useState({
    client: userId,
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: 0,
  });

  const handleChange = (e) => {
    setNewAddress((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const { client, address, city, state, country, pincode } = newaddress;

      const data = await axios.post(
        `http://localhost:8080/createAddress/${userId}`,
        {
          client,
          address,
          city,
          state,
          country,
          pincode,
        },
        {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }
      );

      if (data.data.message !== "address added") {
        toast.error("something error", toastOptions);
      }
      if (data.data.message === "address added") {
        toast.success("SuccessFully Created", toastOptions);
        navigate("/profile");
      }
      console.log(newaddress);
    }
  };
  const handleValidation = () => {
    const { address, city, state, country, pincode } = newaddress;
    if (address.length < 30) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (address.length < 3) {
      toast.error("Should be 20 character", toastOptions);
      return false;
    } else if (city === "") {
      toast.error("city is required.", toastOptions);
      return false;
    } else if (state === "") {
      toast.error("state is required.", toastOptions);
      return false;
    } else if (country === "") {
      toast.error("country is required.", toastOptions);
      return false;
    } else if (pincode === "") {
      toast.error("pincode is required.", toastOptions);
      return false;
    }
    return true;
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div class="row gutters">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h6 class="mt-3 mb-2 text-primary">Address</h6>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div class="form-group">
              <label for="Street">Street/No./Appartment</label>
              <input
                type="text"
                class="form-control"
                id="address"
                placeholder="Enter address"
                onChange={handleChange}
              />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div class="form-group">
              <label for="ciTy">City</label>
              <input
                type="text"
                class="form-control"
                id="city"
                placeholder="Enter City"
                onChange={handleChange}
              />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div class="form-group">
              <label for="sTate">State</label>
              <input
                type="text"
                class="form-control"
                id="state"
                placeholder="Enter State"
                onChange={handleChange}
              />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div class="form-group">
              <label for="sTate">Country</label>
              <input
                type="text"
                class="form-control"
                id="country"
                placeholder="Enter State"
                onChange={handleChange}
              />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div class="form-group">
              <label for="zIp">Zip Code</label>
              <input
                type="number"
                class="form-control"
                id="pincode"
                placeholder="Zip Code"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <button className="btn-primary btn-sm mx-2" onClick={handleClick}>
          Add
        </button>
        <Link to={"/profile"}>
          <button className="btn-danger btn-sm">cancel</button>
        </Link>
        <ToastContainer />
      </div>
    </>
  );
}

export default NewAddress;
