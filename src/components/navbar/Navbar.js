import React from "react";
import jwt_decode from "jwt-decode";

import "./navbar.css";
const Navbar = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const decode = jwt_decode(accessToken);
  const current = new Date();
  const date = `${current.getDate()} / ${
    current.getMonth() + 1
  } / ${current.getFullYear()}`;
  return (
    <div className="navbar">
      <div id="menu-button">
        <input type="checkbox" id="menu-checkbox" />
        <label htmlFor="menu-checkbox" id="menu-label">
          <div id="hamburger"></div>
        </label>
      </div>
      <div className="user-information">
        <p className="text-center">
          Welcome, {decode.first_name + " " + decode.last_name}
        </p>
      </div>
      <div className="current-date">
        <p>{date}</p>
      </div>
    </div>
  );
};

export default Navbar;
