import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./add.css";
import axios from "axios";
import { server } from "../../../server";
const Add = () => {
  const navigate = useNavigate();

  const [hostname, setHostname] = useState("");
  const [floor, setFloor] = useState("1");
  const [func, setFunc] = useState("");
  const [ctg, setCtg] = useState("");
  const [group, setGroup] = useState("");
  const [rack, setRack] = useState("");
  const [status, setStatus] = useState("On");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [location, setLocation] = useState("");
  const [sNumber, setSnumber] = useState("");
  const [remark, setRemark] = useState("");

  const precreate = "Are you sure to create ?";
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setMsg(null);
    setShow(false);
  };

  const accessToken = sessionStorage.getItem("accessToken");
  const decode = jwt_decode(accessToken);

  useEffect(() => {
    isLogin();
  });
  const isLogin = async () => {
    try {
      if (!accessToken) {
        navigate("/404");
      } else {
        if (!decode.userId) return navigate("/404");
      }
    } catch (error) {
      console.log(error.message);
      if (error.message) return navigate("/404");
    }
  };
  const createHandler = async (e) => {
    e.preventDefault();
    try {
      const post = await axios.post(`${server}/create`, {
        user_id: decode.userId,
        hostname,
        floor,
        rack,
        status,
        group,
        func,
        ctg,
        serial_number: sNumber,
        location,
        brand,
        type,
        remark,
        updated_by: decode.first_name + " " + decode.last_name,
      });
      setMsg(post.data.msg);
      return setShow(true);
    } catch (e) {
      setMsg(e.message);
      return setShow(true);
    }
  };
  return (
    <div className="equipment">
      <Sidebar />
      <div className="equipment-wrap">
        <Navbar />
        <div className="equipment-content">
          <h1 className="text-center">Add New</h1>
          <div className="container">
            <div className="row content">
              <form action="" className="row">
                <div className="col-md-6 col-sm-12 col-xm-12  mb-3">
                  <div className="form-group mb-3">
                    <label htmlFor="hname" className="form-label">
                      Hostname
                    </label>
                    <input
                      type="text"
                      id="hname"
                      className="form-control"
                      placeholder="hostname"
                      value={hostname}
                      onChange={(e) => {
                        setHostname(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-12 col-xm-12  mb-3">
                  <div className="form-group mb-3">
                    <label htmlFor="floor" className="form-label">
                      Floor
                    </label>
                    <select
                      id="floor"
                      className="form-select"
                      placeholder="floor"
                      value={floor}
                      onChange={(e) => {
                        setFloor(e.target.value);
                      }}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-3 col-sm-12 col-xm-12 mb-3">
                  <div className="form-group mb-3">
                    <label htmlFor="function" className="form-label">
                      Function
                    </label>
                    <input
                      type="text"
                      id="function"
                      className="form-control"
                      placeholder="function"
                      value={func}
                      onChange={(e) => {
                        setFunc(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-12 col-xm-12">
                  <div className="form-group mb-3">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <input
                      type="text"
                      id="category"
                      className="form-control"
                      placeholder="category"
                      value={ctg}
                      onChange={(e) => {
                        setCtg(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-12 col-xm-12">
                  <div className="form-group mb-3">
                    <label htmlFor="group" className="form-label">
                      Group
                    </label>
                    <input
                      type="text"
                      id="group"
                      className="form-control"
                      placeholder="group"
                      value={group}
                      onChange={(e) => {
                        setGroup(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-12 col-xm-12 mb-3">
                  <div className="form-group mb-3">
                    <label htmlFor="rack" className="form-label">
                      Rack
                    </label>
                    <input
                      type="text"
                      id="rack"
                      className="form-control"
                      placeholder="rack"
                      value={rack}
                      onChange={(e) => {
                        setRack(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-12 col-xm-12 mb-3">
                  <div className="form-group mb-3">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <select
                      id="status"
                      className="form-select"
                      value={status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    >
                      <option value="On">On</option>
                      <option value="Off">Off</option>
                      <option value="Passive">Passive</option>
                      <option value="Not Found">Not Found</option>
                      <option value="Dismantle">Dismantle</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12 col-xm-12">
                  <div className="form-group mb-3">
                    <label htmlFor="status" className="form-label">
                      Serial Number
                    </label>
                    <input
                      type="text"
                      id="status"
                      className="form-control"
                      placeholder="status"
                      value={sNumber}
                      onChange={(e) => {
                        setSnumber(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-12 col-xm-12 mb-3">
                  <div className="form-group mb-3">
                    <label htmlFor="status" className="form-label">
                      Location
                    </label>
                    <input
                      type="text"
                      id="status"
                      className="form-control"
                      placeholder="status"
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-12 col-xm-12 mb-3">
                  <div className="form-group mb-3">
                    <label htmlFor="status" className="form-label">
                      Brand
                    </label>
                    <input
                      type="text"
                      id="status"
                      className="form-control"
                      placeholder="status"
                      value={brand}
                      onChange={(e) => {
                        setBrand(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-12 col-xm-12 mb-3">
                  <div className="form-group mb-3">
                    <label htmlFor="status" className="form-label">
                      Type
                    </label>
                    <input
                      type="text"
                      id="type"
                      className="form-control"
                      placeholder="status"
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-9 col-sm-12 col-xm-12 mb-3">
                  <div className="form-group mb-3">
                    <label htmlFor="status" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      id="type"
                      className="form-control"
                      placeholder="remarks"
                      value={remark}
                      onChange={(e) => {
                        setRemark(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <button
                    className="btn add-button col-md-2 ms-5 "
                    onClick={createHandler}
                  >
                    Create
                  </button>
                  <button
                    className="btn back-button col-md-2 ms-5 "
                    onClick={() => navigate("/equipment")}
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {msg === null ? (
        ""
      ) : (
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>
              {msg === "Create Successfully" ? (
                <p className="color-succes">Great</p>
              ) : msg === precreate ? (
                "Reminder"
              ) : (
                ""
              )}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {msg === "Create Successfully" ? (
              <div className="text-success d-flex align-items-center">
                <div className="ps-3">{msg}</div>
              </div>
            ) : msg === precreate ? (
              <div className="d-flex align-items-center">
                <div className="ps-3">{msg}</div>
              </div>
            ) : (
              ""
            )}
          </Modal.Body>

          <Modal.Footer>
            {msg === "Create Successfully" ? (
              <Button
                variant="secondary"
                onClick={() => {
                  navigate("/equipment");
                }}
              >
                Close
              </Button>
            ) : (
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Add;
