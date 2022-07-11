import React from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Navbar from "./Navbar";

function CartList(props) {
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
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };
  return (
    <>
      <div>
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <div class="ms-2 me-auto">
              {/* item name */}
              <div class="fw-bold">{props.list.title}</div>
              {/* item price */}Rs {props.list.offerPrice}
              <br></br>
              <span class="text-muted text-decoration-line-through">
                Rs{props.list.price}
              </span>
            </div>
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