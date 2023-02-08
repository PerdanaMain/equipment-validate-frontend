import { React, useState } from "react";

import "./filter.css";
const Filter = () => {
  const [hostname, setHostname] = useState("");
  const [floor, setFloor] = useState("");
  const [func, setFunc] = useState("");
  const [ctg, setCtg] = useState("");
  const [group, setGroup] = useState("");
  const [rack, setRack] = useState("");
  const [status, setStatus] = useState("On");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container">
      <div className="row content">
        <p>Filter By</p>
        <form onSubmit={submitHandler} className="row">
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
                value={floor}
                onChange={(e) => {
                  setFloor(e.target.value);
                }}
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
                value={func}
                onChange={(e) => {
                  setFunc(e.target.value);
                }}
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
                value={ctg}
                onChange={(e) => {
                  setCtg(e.target.value);
                }}
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
                value={group}
                onChange={(e) => {
                  setGroup(e.target.value);
                }}
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
                value={rack}
                onChange={(e) => {
                  setRack(e.target.value);
                }}
              />
            </div>
          </div>
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
          <button className="btn col-md-2">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Filter;
