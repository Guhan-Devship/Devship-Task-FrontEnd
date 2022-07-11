import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function MobileCart(props) {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleSubmit = async () => {
    if (() => props.handlecart()) {
      const data = await axios.post(
        "http://localhost:8080/createCart",
        props.productData,
        {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }
      );
      if (data.data.message !== "added to cart") {
        toast.error(data.data.message, toastOptions);
      }
      if (data.data.message === "added to cart") {
        toast.success("Added to cart", toastOptions);
      }
    }
  };
  return (
    <div class="col mb-5">
      <div class="card h-100">
        {/* sale badge */}
        <div class="badge bg-white text-dark position-absolute sale">Sale</div>
        {/* image */}
        <img
          class="card-img-top"
          src={`http://localhost:8080/${props.productData.image}`}
          alt="..."
        />
        {/* product details */}
        <div class="card-body p-4">
          <div class="text-center">
            <p class="fw-bolder title">{props.productData.title}</p>
            {/* strike the price */}
            <div>
              Original price:
              <span class="text-muted text-decoration-line-through">
                {props.productData.price}
              </span>
              <br></br>
              <span>
                <strong>Offer price: {props.productData.offerPrice} </strong>
              </span>
            </div>
          </div>
        </div>
        {/* button */}
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div class="text-center">
            <button
              // disabled={props.cartItems.some(obj => obj.id === props.productData.id)}
              class="btn btn-outline-dark mt-auto"
              onClick={() => handleSubmit()}
            >
              Add Cart
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default MobileCart;
