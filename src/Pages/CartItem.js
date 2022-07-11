import React, { useEffect, useState } from "react";
import axios from "axios";
import CartList from "./CartList";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function CartItem() {
  let navigate = useNavigate();
  const [cart, setCart] = useState([]);
  function fetchData() {
    if (!localStorage.getItem("myapptoken")) {
      navigate("/");
    }
  }

  let getdata = async () => {
    const { data } = await axios.get("http://localhost:8080/getCart", {
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    });
    setCart(data);
  };

  useEffect(() => {
    getdata();
    fetchData();
  }, []);

  let total = 0;
  cart.map((e) => {
    return (total += e.offerPrice);
  });

  return (
    <>
      <Navbar cart={cart} />
      <div className="container mt-5 text-center">
        {cart.map((list) => {
          return <CartList list={list} cart={cart} getdata={getdata} />;
        })}
        {cart.length > 0 ? (
          <div>
            <h1 className="col-lg-12 text-center fs-4 mt-5">
              Total: Rs {total}
            </h1>
          </div>
        ) : (
          <div>
            <h1 className="col-lg-12 text-center">No Item in Cart</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default CartItem;
