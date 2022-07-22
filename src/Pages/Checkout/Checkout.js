import React, { useEffect, useState } from "react";
import "./Checkout.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Alert } from "bootstrap";

function Checkout({ setOpen, cart, total }) {
  function fetchData() {
    if (!localStorage.getItem("myapptoken")) {
      navigate("/login");
    }
  }
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  let navigate = useNavigate();
  let user = localStorage.getItem("user");
  let mobile = localStorage.getItem("mobile");
  let userId = localStorage.getItem("id");
  const [billAddress, setBillAddress] = useState([]);
  const [shipAddress, setShipAddress] = useState([]);
  console.log(billAddress);
  console.log(cart);

  useEffect(() => {
    fetchData();
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8080/getAddress/${userId}`, {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      })
      .then((res) => {
        if (res.data.length === 0) {
          navigate("/profile");
        }
        setBillAddress(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getShippingAddress/${userId}`, {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      })
      .then((res) => {
        if (res.data.length === 0) {
          navigate("/profile");
        }
        setShipAddress(res.data);
      });
  }, []);
  const handleSubmit = async () => {
    for (let i = 0; i < cart.length; i++) {
      const data = await axios.post(
        "http://localhost:8080/createOrder",
        cart[i],
        {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }
      );
      console.log(data);
      if (data.data.message !== "ordered") {
        toast.error(data.data.message, toastOptions);
      }
      if (data.data.message === "ordered") {
        toast.success(data.data.message, toastOptions);
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="reserve">
        <div className="rContainer">
          <button
            className="btn btn-sm btn-danger rounded-circle mx-1"
            onClick={() => setOpen(false)}
          >
            X
          </button>
          <span>Bill </span>
          <br></br>
          <span className="fw-5 fs-5">Customer Name : {user}</span>
          <br></br>
          <span>Mobile: {mobile}</span>
          <div className="row">
            {billAddress.filter((value) => value.billingAddress === false)
              .length > 2 ? (
              (navigate("/profile"), alert("Error : Set a default Address"))
            ) : (
              <div className="col-6">
                Billing Address
                {billAddress.map((item) => {
                  if (item.billingAddress === true) {
                    localStorage.setItem(
                      "address",
                      JSON.stringify(item.address)
                    );
                    return (
                      <p className="address">
                        {item.address}
                        <br></br>
                        {item.city}
                        <br></br>
                        {item.state}
                        <br></br>
                        {item.pincode}
                      </p>
                    );
                  } else if (item.billingAddress === false) {
                  }
                })}
              </div>
            )}
            {shipAddress.filter((value) => value.shippingAddress === false)
              .length > 2 ? (
              (navigate("/profile"), alert("Error :Set a default Address"))
            ) : (
              <div className="col-6">
                Shipping Address
                {shipAddress.map((item) => {
                  if (item.shippingAddress === true) {
                    localStorage.setItem(
                      "Shipaddress",
                      JSON.stringify(item.address)
                    );
                    return (
                      <p className="address">
                        {item.address}
                        <br></br>
                        {item.city}
                        <br></br>
                        {item.state}
                        <br></br>
                        {item.pincode}
                      </p>
                    );
                  }
                })}
              </div>
            )}
          </div>
          <div className="bill-container">
            {cart.map((item) => (
              <div className="rItem">
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  {/* <div className="rDesc">&#x20b9;</div> */}
                  <div className="rMax">
                    Max Discount: <b>25%</b>
                  </div>
                  <div className="rPrice">
                    &#x20b9; {item.offerPrice} X {item.quantity}
                  </div>
                  <div className="rPrice">
                    <strong>Total</strong> &#x20b9;{" "}
                    {item.offerPrice * item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <p className="text-center mt-5">
              <h5>Cart Total</h5>({cart.length}): Rs {total}
            </p>
          </div>

          <button className="rButton" onClick={() => handleSubmit()}>
            paynow
          </button>
        </div>
      </div>
    </>
  );
}

export default Checkout;
