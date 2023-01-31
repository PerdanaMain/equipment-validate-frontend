import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import "./update.css";
const Update = () => {
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
    <div className="equipment">
      <Sidebar />
      <div className="equipment-wrap">
        <Navbar />
        <div className="equipment-content">
          <h1 className="text-center">Update Equipment</h1>
          <div className="container">
            <div className="row content">
              <form action="" className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="form-group mb-3">
                    <label htmlFor="hname" className="form-label">
                      Hostname
                    </label>
                    <input
                      type="text"
                      id="hname"
                      className="form-control"
                      placeholder="hostname"
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-12">
                  <div className="form-group mb-3">
                    <label htmlFor="floor" className="form-label">
                      Floor
                    </label>
                    <input
                      type="text"
                      id="floor"
                      className="form-control"
                      placeholder="floor"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group mb-3">
                    <label htmlFor="function" className="form-label">
                      Function
                    </label>
                    <input
                      type="text"
                      id="function"
                      className="form-control"
                      placeholder="function"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group mb-3">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <input
                      type="text"
                      id="category"
                      className="form-control"
                      placeholder="category"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group mb-3">
                    <label htmlFor="group" className="form-label">
                      Group
                    </label>
                    <input
                      type="text"
                      id="group"
                      className="form-control"
                      placeholder="group"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group mb-3">
                    <label htmlFor="rack" className="form-label">
                      Rack
                    </label>
                    <input
                      type="text"
                      id="rack"
                      className="form-control"
                      placeholder="rack"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group mb-3">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <input
                      type="text"
                      id="status"
                      className="form-control"
                      placeholder="status"
                    />
                  </div>
                </div>
                <button className="btn add-button col-md-2">Update</button>
                <button className="btn back-button col-md-2">Back</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
