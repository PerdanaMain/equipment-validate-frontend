import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./dashboard.css";
import { server } from "../../server";

const Dashboard = () => {
  const navigate = useNavigate();

  const accessToken = sessionStorage.getItem("accessToken");
  const decode = jwt_decode(accessToken);

  const [users, setUsers] = useState("");
  const [on, setOn] = useState("");
  const [nf, setNf] = useState("");
  const [off, setOff] = useState("");
  const [psv, setPsv] = useState("");
  const [tempId, setTempId] = useState("");

  const [msg, setMsg] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setMsg(null);
    setShow(false);
  };

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  useEffect(() => {
    isLogin();
    getUsers();
    getFunctions();
  }, []);
  const getFunctions = async () => {
    try {
      const on = await axios.get(`${server}/data/status/on`);
      const off = await axios.get(`${server}/data/status/off`);
      const nf = await axios.get(`${server}/data/status/nf`);
      const psv = await axios.get(`${server}/data/status/psv`);
      setOn(on.data.data);
      setOff(off.data.data);
      setNf(nf.data.data);
      setPsv(psv.data.data);
    } catch (e) {
      console.log(e.message);
    }
  };
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
  const getUsers = async () => {
    try {
      const get = await axios.get(`${server}/users`);
      setUsers(get.data.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  const deleteHandler = async () => {
    if (parseInt(decode.job_id) !== 3) {
      setMsg("You are not allowed to delete user");
      return setShow(true);
    }
    try {
      await axios.delete(`${server}/users/${tempId}`);
    } catch (e) {
      console.log(e.message);
    }
  };

  const deleteAlertMsg = "Are you sure to delete this user?";
  const deleteShow = (id) => {
    setTempId(id);
    setMsg(deleteAlertMsg);
    return setShow(true);
  };
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-wrap">
        <Navbar />
        <div className="dashboard-content">
          <h1 className="text-center mb-3">Dashboard</h1>

          <div className="row">
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                          On
                        </p>
                        <h5 className="font-weight-bolder mb-0">{on.length}</h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i
                          className="ni ni-money-coins text-lg opacity-10"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                          Off
                        </p>
                        <h5 className="font-weight-bolder mb-0">
                          {off.length}
                        </h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i
                          className="ni ni-world text-lg opacity-10"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                          Not Found
                        </p>
                        <h5 className="font-weight-bolder mb-0">{nf.length}</h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i
                          className="ni ni-paper-diploma text-lg opacity-10"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                          Passive
                        </p>
                        <h5 className="font-weight-bolder mb-0">
                          {psv.length}
                        </h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i
                          className="ni ni-paper-diploma text-lg opacity-10"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row my-4">
            <div className="col-xl-6 col-md-6 col-sm-12 col-xm-12">
              {/* {Barchart} */}
            </div>
            <div className="col-xl-6 col-md-6 col-sm-12 col-xm-12">
              {/* {Piechart} */}
            </div>
          </div>

          <div className="row my-4">
            <div className="col-lg-12 col-md-6 mb-md-0 mb-4">
              <div className="card">
                <div className="card-header pb-0">
                  <div className="row">
                    <div className="col-lg-6 col-7 mb-1">
                      <h6>Active Users</h6>
                    </div>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="table-responsive">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Name
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Gender
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Phone
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Email
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Role
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.values(users).map((data, index) => (
                          <tr key={index}>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">
                                    {data.first_name + " " + data.last_name}
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">{data.gender}</h6>
                              </div>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span className="text-xs font-weight-bold">
                                {data.phone}
                              </span>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span className="text-xs font-weight-bold">
                                {data.email}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">
                                  {data.jobs.job_name}
                                </h6>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex flex-column justify-content-center">
                                <button
                                  className="text center btn btn-outline-danger"
                                  onClick={() => {
                                    deleteShow(data.id);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
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
              {msg === deleteAlertMsg ? (
                <p className="fst-bold">Reminder</p>
              ) : msg === "User Deleted" ? (
                <p className="fst-bold">Great</p>
              ) : (
                <p className="fst-bold">Sorry</p>
              )}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {msg === deleteAlertMsg ? (
              <div className="text-danger d-flex align-items-center">
                <div className="ps-3">{msg}</div>
              </div>
            ) : msg === "User Deleted" ? (
              <div className="text-success d-flex align-items-center">
                <div className="ps-3">{msg}</div>
              </div>
            ) : (
              <div className="text-danger d-flex align-items-center">
                <div className="ps-3">{msg}</div>
              </div>
            )}
          </Modal.Body>

          <Modal.Footer>
            {msg === deleteAlertMsg ? (
              <>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="danger" onClick={deleteHandler}>
                  Delete
                </Button>
              </>
            ) : msg === "User Deleted" ? (
              <Button variant="secondary" onClick={handleClose}>
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

export default Dashboard;
