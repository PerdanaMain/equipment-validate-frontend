import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Filter from "../../components/filter/Filter";
import addLogo from "../../assets/add-new.png";
import edit from "../../assets/edit-logo.png";
import del from "../../assets/delete-logo.png";

import Table from "react-bootstrap/Table";

import "./equipment.css";
const DataCenter = () => {
  const [equipments, setEquipments] = useState("");
  const getEquipmentLists = async () => {
    try {
      const get = await axios.get(
        "https://s41.aconvert.com/convert/p3r68-cdx67/sn094-e81zd.json"
      );
      setEquipments(get.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEquipmentLists();
  });
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
  console.log(equipments);
  return (
    <div className="equipment">
      <Sidebar />
      <div className="equipment-wrap">
        <Navbar />
        <div className="equipment-content">
          <h1 className="text-center">Equipments</h1>
          <Filter />
          <div className="row button">
            <div className="col-md">
              <a href="/equipment/add" className="btn btn-primary add-new">
                <img src={addLogo} alt="add-logo" />
                Add New
              </a>
              <button className="btn btn-success">
                <img src={addLogo} alt="add-logo" />
                Export to excel
              </button>
            </div>
          </div>
          <div className="row result my-3 container">
            {Object.values(equipments).map((data, index) => (
              <div className="col-md-4 col-sm-12">
                <div className="card">
                  <div className="card-header">
                    <p>Hostname</p>
                  </div>
                  <div className="card-body">
                    <Table striped bordered hover>
                      <tbody>
                        <tr>
                          <td>Mark</td>
                          <td>Otto</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <div className="card-footer text-center">
                    <button className="btn btn-success me-3">
                      <img src={edit} alt="add-logo" />
                      Edit
                    </button>
                    <button className="btn btn-danger">
                      <img src={del} alt="add-logo" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCenter;
