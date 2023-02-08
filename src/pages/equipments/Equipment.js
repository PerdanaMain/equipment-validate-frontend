import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import * as XLSX from "xlsx";

import { server } from "../../server";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Alert from "react-bootstrap/Alert";

import edit from "../../assets/edit-logo.png";
import del from "../../assets/delete-logo.png";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./equipment.css";
const DataCenter = () => {
  const [equipments, setEquipments] = useState("");
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  const decode = jwt_decode(accessToken);

  const getEquipmentLists = async () => {
    try {
      const get = await axios.get(`${server}/data`);
      setEquipments(get.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEquipmentLists();
  }, []);

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
  const [hostname, setHostname] = useState("");
  const [floor, setFloor] = useState("");
  const [rack, setRack] = useState("");
  const [status, setStatus] = useState("On");
  const [formData, setFormData] = useState({
    filter: "hostname",
  });
  const filterChangeHandler = async (event) => {
    const { name, value, type, checked } = event.target; //event target destructuring

    setFormData((prevFormData) => {
      //set State Value
      return {
        ...prevFormData, //take prev state to new object
        [name]: type === "checkbox" ? checked : value, // if type is checkbox the value will be checked (bolean value) else the value willl be value of input
      };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    if (formData.filter === "hostname") {
      const get = await axios.get(
        `${server}/sort/hostname?hostname=${hostname}`
      );
      setEquipments(get.data.data);
    } else if (formData.filter === "floor") {
      const get = await axios.get(`${server}/sort/floor?floor=${floor}`);
      setEquipments(get.data.data);
    } else if (formData.filter === "rack") {
      const get = await axios.get(`${server}/sort/rack?rack=${rack}`);
      setEquipments(get.data.data);
    } else if (formData.filter === "status") {
      const get = await axios.get(`${server}/sort/status?status=${status}`);
      setEquipments(get.data.data);
    }
  };
  const [msg, setMsg] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setMsg(null);
    setShow(false);
    navigate(0);
  };

  const deleteHandler = async () => {
    if (parseInt(decode.job_id) !== 3) {
      setMsg("You are not allowed to delete equipment");
      return setShow(true);
    }
    try {
      const dlt = await axios.delete(`${server}/delete/${tempId}`);
      setMsg(dlt.data.msg);
      return setShow(true);
    } catch (error) {
      setMsg(error.message);
      return setShow(true);
    }
  };
  const [tempId, setTempId] = useState(null);
  const deleteShow = async (id, hostname) => {
    setTempId(id);
    setMsg(`Are you sure to delete ${hostname}`);
    return setShow(true);
  };
  const exportToExcelHandler = () => {
    const dateNow = new Date();
    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(equipments);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, `Equipment-Validate-${dateNow.toUTCString()}.xlsx`);
  };
  return (
    <div className="equipment">
      <Sidebar />
      <div className="equipment-wrap">
        <Navbar />
        <div className="equipment-content">
          <h1 className="text-center">Equipments</h1>
          <div className="container">
            <div className="row content">
              <p>Filter By</p>
              <form onSubmit={submitHandler} className="row">
                <div className="col-md-12">
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="filter"
                      id="flexRadioDefault1"
                      value="hostname"
                      checked={formData.filter === "hostname"}
                      onChange={filterChangeHandler}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Hostname
                    </label>
                    <div className="form-check form-check-inline ms-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="filter"
                        id="inlineRadio1"
                        value="floor"
                        checked={formData.filter === "floor"}
                        onChange={filterChangeHandler}
                      />
                      <label className="form-check-label" for="inlineRadio1">
                        Floor
                      </label>
                    </div>
                    <div className="form-check form-check-inline ms-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="filter"
                        id="inlineRadio1"
                        value="rack"
                        checked={formData.filter === "rack"}
                        onChange={filterChangeHandler}
                      />
                      <label className="form-check-label" for="inlineRadio1">
                        Rack
                      </label>
                    </div>
                    <div className="form-check form-check-inline ms-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="filter"
                        id="inlineRadio1"
                        value="status"
                        checked={formData.filter === "status"}
                        onChange={filterChangeHandler}
                      />
                      <label className="form-check-label" for="inlineRadio1">
                        Status
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {formData.filter === "hostname" ? (
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
                          value={hostname}
                          onChange={(e) => {
                            setHostname(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  ) : formData.filter === "floor" ? (
                    <div className="col-md-3 col-sm-12">
                      <div className="form-group mb-3">
                        <label htmlFor="floor" className="form-label">
                          Floor
                        </label>
                        <input
                          type="number"
                          id="floor"
                          min={1}
                          className="form-control"
                          placeholder="floor"
                          value={floor}
                          onChange={(e) => {
                            setFloor(parseInt(e.target.value));
                          }}
                        />
                      </div>
                    </div>
                  ) : formData.filter === "rack" ? (
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
                          value={rack}
                          onChange={(e) => {
                            setRack(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  ) : formData.filter === "status" ? (
                    <div className="col-md-3">
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
                  ) : (
                    ""
                  )}
                </div>
                <button className="btn col-md-2">Search</button>
              </form>
            </div>
          </div>
          <div className="row button">
            <div className="col-md">
              <a href="/equipment/add" className="btn btn-primary add-new">
                Add New
              </a>
              <button
                className="btn btn-success"
                onClick={exportToExcelHandler}
              >
                Export to excel
              </button>
            </div>
          </div>
          <div className="row result my-3 container">
            {equipments.length === 0 ? (
              <div className="container">
                <Alert variant="danger">
                  <Alert.Heading>We are sorry</Alert.Heading>
                  <p>Data not found</p>
                </Alert>
              </div>
            ) : (
              Object.values(equipments).map((data, index) => (
                <div className="col-md-4 col-sm-12 my-3" key={index}>
                  <div className="card">
                    <div className="card-header">
                      <p>{data.rack}</p>
                    </div>
                    <div className="card-body">
                      <p className="text-muted">
                        Last Updated At : {data.updatedAt.slice(0, 10)}
                      </p>
                      <p className="text-muted">
                        Last Updated By : {data.updated_by}
                      </p>
                      <Table striped bordered hover>
                        <tbody>
                          <tr>
                            <td className="head-label">Location</td>
                            <td>{data.location}</td>
                          </tr>
                          <tr>
                            <td className="head-label">Floor</td>
                            <td>{data.floor}</td>
                          </tr>
                          <tr>
                            <td className="head-label">Rack</td>
                            <td>{data.rack}</td>
                          </tr>
                          <tr>
                            <td className="head-label">Hostname</td>
                            <td>{data.hostname}</td>
                          </tr>
                          <tr>
                            <td className="head-label">Capcity</td>
                            <td>{data.capacity + " "}u</td>
                          </tr>
                          <tr>
                            <td className="head-label">Brand</td>
                            <td>{data.brand}</td>
                          </tr>
                          <tr>
                            <td className="head-label">Type</td>
                            <td>{data.type}</td>
                          </tr>
                          <tr>
                            <td className="head-label">S / N</td>
                            <td>{data.serial_number}</td>
                          </tr>
                          <tr>
                            <td className="head-label">Function</td>
                            <td>{data.function}</td>
                          </tr>
                          <tr>
                            <td className="head-label">Group</td>
                            <td>{data.group}</td>
                          </tr>
                          <tr>
                            <td className="head-label">Status</td>
                            <td>{data.status}</td>
                          </tr>
                          <tr>
                            <td className="head-label">Remark</td>
                            <td>{data.remark}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    <div className="card-footer text-center">
                      <Link
                        to={`update/${data.id}`}
                        className="btn btn-success me-3"
                      >
                        <img src={edit} alt="add-logo" />
                        Edit
                      </Link>

                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteShow(data.id, data.hostname);
                        }}
                      >
                        <img src={del} alt="add-logo" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {msg === null ? (
        ""
      ) : (
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>
              {msg === "Equipment Deleted" ? (
                <p className="fst-bold">Great</p>
              ) : (
                <p className="fst-bold">Sorry</p>
              )}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {msg === "Equipment Deleted" ? (
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
            {msg === "You are not allowed to delete equipment" ? (
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            ) : msg === "Equipment Deleted" ? (
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            ) : (
              <>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="danger" onClick={deleteHandler}>
                  Delete
                </Button>
              </>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default DataCenter;
