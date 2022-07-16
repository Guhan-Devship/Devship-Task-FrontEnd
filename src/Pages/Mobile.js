import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CartItem from "./CartItem";
import MobileCart from "./MobileCart";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";

function Mobile() {
  let params = useParams();
  let navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [product, setProduct] = useState([]);
  const [serach, setSerach] = useState("");

  let getdata = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/getallProduct?category=${params.id}`
    );
    setProduct(data);
  };

  useEffect(() => {
    getdata();
  }, []);

  const [cartitems, setCartItems] = useState([]);

  let handleCart = (item) => {
    setCartItems([...cartitems, item]);
    localStorage.setItem("cartList", JSON.stringify(cartitems));
    toast.success("Added", toastOptions);
  };

  useEffect(() => {
    let cartlist = localStorage.getItem("cartList");
    if (cartlist) {
      setCartItems(JSON.parse(cartlist));
    }
  }, []);

  

  return (
    <div>
      <Navbar cartitems={[cartitems]} />
      <form class="text-center form-inline mx-5 mt-2">
        <input
          class="form-control mr-sm-2"
          type="text"
          onChange={(e) => setSerach(e.target.value)}
          placeholder="Search"
          aria-label="Search"
        />
        <br />
        {/* <button
          class="btn btn-outline-success my-2 my-sm-0"
          onClick={handleSearch}
          type="submit"
        >
          Search
        </button> */}
      </form>
      <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {product
              .filter((card) => {
                if (serach == "") {
                  return card;
                } else if (
                  card.title.toLowerCase().includes(serach.toLowerCase())
                )
                  return card;
              })
              .map((card) => {
                return (
                  <MobileCart productData={card} handleCart={handleCart} />
                );
              })}
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default Mobile;
