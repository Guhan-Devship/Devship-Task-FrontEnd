import React, { useEffect, useState } from "react";
import axios from "axios";
import CartList from "./CartList";
import Navbar from "./Navbar";

function CartItem() {
  const [cart, setCart] = useState([]);
  let getdata = async () => {
    const { data } = await axios.get("http://localhost:8080/getCart");
    setCart(data);
    console.log(data);
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      <Navbar />
      <div>
        {cart.map((list) => {
          return <CartList list={list} cart={cart} />;
        })}
        {cart.length > 0 ? (
          <div>
            <h1 className="col-lg-12 text-center">Total: $</h1>
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
