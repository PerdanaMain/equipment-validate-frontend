import React from "react";
import { Link } from "react-router-dom";

import "./sidebar.css";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">SNB</span>
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
          <div className="li" role={"button"}>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
