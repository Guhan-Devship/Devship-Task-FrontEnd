import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div class="nav-wrap">
        <nav class="main-nav" role="navigation">
          <ul className="sidebar-ul">
            <Link to={"/todo"}>
              <li className="sidebar-li">Todo</li>
            </Link>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
