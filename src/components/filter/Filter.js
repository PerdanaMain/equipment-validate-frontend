import React from "react";

import "./filter.css";
const Filter = () => {
  return (
    <div className="container">
      <div className="row content">
        <p>Filter By</p>
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
          <button className="btn col-md-2">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Filter;
