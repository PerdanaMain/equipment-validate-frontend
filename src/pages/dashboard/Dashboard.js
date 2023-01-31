import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

import "./dashboard.css";
const Dashboard = () => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  useEffect(() => {
    isLogin();
  });
  const isLogin = async () => {
    try {
      if (!accessToken) {
        navigate("/404");
      } else {
        const decode = jwt_decode(accessToken);
        console.log(decode.id);
        if (!decode.userId) return navigate("/404");
      }
    } catch (error) {
      console.log(error.message);
      if (error.message) return navigate("/404");
    }
  };
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-wrap">
        <Navbar />
        <div className="dashboard-content">
          <h1 className="text-center">Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
