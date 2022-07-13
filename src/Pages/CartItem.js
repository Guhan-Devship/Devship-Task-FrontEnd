import React, { useEffect, useState } from "react";
import axios from "axios";
import CartList from "./CartList";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Checkout from "./Checkout/Checkout";

function CartItem() {
  let navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
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
  const handleClick = () => {
    if (localStorage.getItem("myapptoken")) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <>
        <Navbar cart={cart} />
        <div className="container mt-5 text-center">
          <div className="cartlist-container">
            {cart.map((list) => {
              return <CartList list={list} cart={cart} getdata={getdata} />;
            })}
          </div>
          {cart.length > 0 ? (
            <>
              <div>
                <h1 className="col-lg-12 text-center fs-4 mt-5">
                  Total({cart.length}): Rs {total}
                </h1>
              </div>
              <button className="btn-primary btn-sm" onClick={handleClick}>
                CheckOut
              </button>
            </>
          ) : (
            <div>
              <h1 className="col-lg-12 text-center">No Item in Cart</h1>
            </div>
          )}
        </div>
      </>
      {openModal && (
        <Checkout setOpen={setOpenModal} cart={cart} total={total} />
      )}
    </div>
  );
}

export default CartItem;
