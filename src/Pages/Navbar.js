import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar(props) {
  let navigate = useNavigate();
  let handleLogout = () => {
    window.localStorage.removeItem("myapptoken", "user", "mobile");
    navigate("/");
  };

  let user = window.localStorage.getItem("user");
  let mobile = window.localStorage.getItem("mobile");

  return (
    <>
      <nav id="navbar-example2" class="navbar navbar-light bg-dark">
        <Link to={"/home"} class="navbar-brand text-white">
          User Page
        </Link>
        <Link to={"/cart"}>
          <button class="btn btn-outline-primary" type="submit">
            <i class="bi-cart-fill me-1"></i>
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            Cart
            <span class="badge bg-primary text-white ms-1 rounded-pill"></span>
          </button>
        </Link>
        <ul class="nav nav-pills">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-list" aria-hidden="true"></i>
              Categories
            </a>
            <div class="dropdown-menu">
              <Link to={"/view/mobile"} class="dropdown-item">
                Mobile
              </Link>
              <Link to={"/view/shoe"} class="dropdown-item">
                Shoe
              </Link>
              <div role="separator" class="dropdown-divider"></div>
            </div>
          </li>
        </ul>
        <ul class="nav nav-pills">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-user" aria-hidden="true"></i>
              {user}
            </a>
            <div class="dropdown-menu">
              <a class="dropdown-item">{user}</a>
              <a class="dropdown-item">{mobile}</a>
              <div role="separator" class="dropdown-divider"></div>
              <a class="dropdown-item text-danger" onClick={handleLogout}>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
