import React from "react";

import "./navbar.css";
const Navbar = () => {
  const current = new Date();
  const date = `${current.getDate()} / ${
    current.getMonth() + 1
  } / ${current.getFullYear()}`;
  return (
    <div className="navbar">
      <div id="menu-button">
        <input type="checkbox" id="menu-checkbox" />
        <label for="menu-checkbox" id="menu-label">
          <div id="hamburger"></div>
        </label>
      </div>
      <div className="user-information">
        <p className="text-center">Welcome, Username</p>
      </div>
      <div className="current-date">
        <p>{date}</p>
      </div>
    </div>
  );
};

export default Navbar;
