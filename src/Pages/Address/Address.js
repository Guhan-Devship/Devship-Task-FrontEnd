import axios from "axios";
import React, { useState } from "react";

function Address(props) {
  console.log(props.userId);
  console.log(props.list?._id);
  const [addressDefault, setAddressDefault] = useState({
    billingAddress: true,
  });
  console.log(addressDefault);

  let handleAddress = async (id) => {
    setAddressDefault({ billingAddress: true });
    if (addressDefault.billingAddress === true) {
      await axios.put(
        `http://localhost:8080/updateAddress/${id}`,
        addressDefault,
        {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }
      );
    }
    window.location.reload(false);
  };
  let handleDelete = async (id) => {
    try {
      let ask = window.confirm(
        "Are you sure, do you want to delete this Room?"
      );
      if (ask) {
        await axios.delete(
          `http://localhost:8080/deleteAddress/${id}/${props.userId}`,
          {
            headers: {
              Authorization: window.localStorage.getItem("myapptoken"),
            },
          }
        );
        alert("Removed");
        window.location.reload(false);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
      <div class="card border-secondary mb-3">
        <div class="card-header">Address</div>
        <div class="card-body text-secondary">
          <p class="card-text">{props.list?.address}</p>
          <p class="card-text">
            {props.list?.city}
            {props.list?.state}
            {props.list?.country}
          </p>
          <p class="card-text">{props.list?.pincode}</p>
          <button className="btn-sm btn-warning me-2">edit</button>
          <button
            className="btn-sm btn-danger me-2"
            onClick={() => handleDelete(props.list?._id)}
          >
            Remove
          </button>
          {props.list?.billingAddress ? (
            "Default Address"
          ) : (
            <button
              className="btn-sm btn-secondary"
              onClick={() => handleAddress(props.list?._id)}
            >
              set as default
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Address;
