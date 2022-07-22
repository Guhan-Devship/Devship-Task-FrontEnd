import React, { useEffect, useState } from "react";
import Address from "../Address/Address";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import ShippinAddress from "../Address/ShippinAddress";

function Profile() {
  let navigate = useNavigate();
  let userId = localStorage.getItem("id");
  const [user, setUserData] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [shipAddress, setShipAddress] = useState([]);
  function checkData() {
    if (!localStorage.getItem("myapptoken")) {
      navigate("/");
    }
  }
  useEffect(() => {
    checkData();
  });

  async function fetchData() {
    let user = await axios.get(`http://localhost:8080/user/${userId}`, {
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    });
    setUserData({
      id: user.data._id,
      name: user.data.name,
      email: user.data.email,
      mobile: user.data.mobile,
      address: user.data.address,
    });
  }
  useEffect(() => {
    axios
      .get(`http://localhost:8080/getAddress/${userId}`, {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      })
      .then((res) => {
        setUserAddress(res.data);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getShippingAddress/${userId}`, {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      })
      .then((res) => {
        setShipAddress(res.data);
      });
  }, []);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setUserData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleUpdate = async () => {
    const updateData = await axios
      .put(`http://localhost:8080/updateUser/${userId}`, user, {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      })
      .then((res) => {
        alert("Updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="mt-5">guhan</div>
        <div className="row mt-5">
          <div class="row gutters">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <h6 class="mb-2 text-primary">Personal Details</h6>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div class="form-group">
                <label for="fullName">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Enter full name"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div class="form-group">
                <label for="eMail">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Enter email ID"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div class="form-group">
                <label for="phone">Phone</label>
                <input
                  type="text"
                  class="form-control"
                  id="mobile"
                  placeholder="Enter phone number"
                  value={user.mobile}
                  onChange={handleChange}
                />
              </div>
              <button
                className="btn-sm btn-danger"
                onClick={() => handleUpdate()}
              >
                update
              </button>
            </div>
          </div>

          <div className="row mt-5">
            <p>Billing Address</p>
            {userAddress.length === 0 ? (
              <div className="mb-5"> Add Address </div>
            ) : userAddress.length >= 3 ? (
              <div className="mb-5 text-danger">
                Limit exceded delete one address for adding other address
              </div>
            ) : (
              ""
            )}
            {userAddress.map((list) => {
              return <Address list={list} userId={userId} />;
            })}
          </div>
          <div className="col-2">
            <Link to={"/address"}>
              <button
                className="btn-sm btn-secondary"
                disabled={userAddress.length >= 3}
              >
                Add Address
              </button>
            </Link>
          </div>
          <div className="row mt-5">
            <p>Shipping Address</p>
            {shipAddress.length === 0 ? (
              <div className="mb-5"> Add Address </div>
            ) : shipAddress.length >= 3 ? (
              <div className="mb-5 text-danger">
                Limit exceded delete one address for adding other address
              </div>
            ) : (
              ""
            )}
            {shipAddress.map((list) => {
              return <ShippinAddress list={list} userId={userId} />;
            })}
          </div>
          <div className="col-2">
            <Link to={"/shipaddress"}>
              <button
                className="btn-sm btn-secondary"
                disabled={shipAddress.length >= 3}
              >
                Add Address
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
