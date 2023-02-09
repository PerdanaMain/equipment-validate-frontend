import { React, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { server } from "../../server";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";

import "./navbar.css";

const Navbar = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const decode = jwt_decode(accessToken);
  const current = new Date();
  const date = `${current.getDate()} / ${
    current.getMonth() + 1
  } / ${current.getFullYear()}`;

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logoutHandler = async () => {
    try {
      await axios.delete(`${server}/logout`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      sessionStorage.clear();
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <div id="menu-button">
        <input type="checkbox" id="menu-checkbox" />
        <label htmlFor="menu-checkbox" id="menu-label" className="d-lg">
          <div id="hamburger"></div>
        </label>
        <input type="checkbox" id="menu-checkbox" />
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
