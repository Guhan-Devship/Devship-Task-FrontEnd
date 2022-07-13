import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function CartList(props) {
  let navigate = useNavigate();
  function fetchData() {
    if (!localStorage.getItem("myapptoken")) {
      navigate("/");
    }
  }
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  let handleDelete = async (id) => {
    try {
      let ask = window.confirm(
        "Are you sure, do you want to remove this Cart?"
      );
      if (ask) {
        await axios.delete(`http://localhost:8080/deleteCart/${id}`, {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        });
        toast.success("Removed", toastOptions);
        props.getdata();
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  return (
    <>
      <div>
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center li-style">
            <div class="ms-2 me-auto">
              {/* item name */}
              <div class="fw-bold">{props.list.title}</div>
              {/* item price */}Rs {props.list.offerPrice}
              <br></br>
              <span class="text-muted text-decoration-line-through">
                Rs{props.list.price}
              </span>
            </div>
            <img
              src={`http://localhost:8080/${props.list.image}`}
              className="img-fluid cart-img"
            />
            {/* button to remove item from the cart */}
            <button
              class="btn badge bg-danger rounded-pill"
              onClick={() => handleDelete(props.list._id)}
            >
              X
            </button>
          </li>
        </ul>
        <ToastContainer />
      </div>
    </>
  );
}

export default CartList;
