import React, { useState } from "react";
import "./Checkout.css";
import axios from "axios";

function Checkout({ setOpen, cart, total }) {
  let user = localStorage.getItem("user");
  let mobile = localStorage.getItem("mobile");

  // console.log(cart);
  // console.log({ user });
  const handleSubmit = async () => {
    const data = await axios.post("http://localhost:8080/createOrder", cart, {
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    });
    console.log(data);
    if (data.data.message !== "ordered") {
      alert("Error");
    }
    if (data.data.message === "ordered") {
      alert("Ordered");
    }
  };
  return (
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
        <div className="bill-container">
          {cart.map((item) => (
            <div className="rItem">
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                {/* <div className="rDesc">&#x20b9;</div> */}
                <div className="rMax">
                  Max Discount: <b>25%</b>
                </div>
                <div className="rPrice">&#x20b9; {item.offerPrice}</div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <p className="text-center mt-5">
            Total({cart.length}): Rs {total}
          </p>
        </div>
        <button className="rButton" onClick={() => handleSubmit()}>
          paynow
        </button>
      </div>
    </div>
  );
}

export default Checkout;
