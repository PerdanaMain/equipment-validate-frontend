import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { server } from "../../server";

import "./sidebar.css";
const Sidebar = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

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
    <div className="sidebar">
      <div className="top">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">EVE</span>
        </Link>
      </div>
      <hr />
      <div className="center mt-5">
        <div className="ul">
          <p className="title">MAIN</p>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <div className="li">
              <span>Dashboard</span>
            </div>
          </Link>
          <Link to="/equipment" style={{ textDecoration: "none" }}>
            <div className="li">
              <span>Equipments</span>
            </div>
          </Link>
          <div className="li" role={"button"} onClick={logoutHandler}>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
