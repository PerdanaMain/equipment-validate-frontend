import { React, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./register.css";

const Register = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Laki - Laki");
  const [jobId, setJobid] = useState(1);
  const [snumber, setSnumber] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");

  const sucess = "Register Successfully";

  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setMsg(null);
    setShow(false);
  };

  const registHandler = async (e) => {
    e.preventDefault();
    const isNumber = isFinite(phone);
    try {
      if (!fname) {
        setMsg("First Name Can't be empty");
        return setShow(true);
      }
      if (!lname) {
        setMsg("Last Name Can't be empty");
        return setShow(true);
      }
      if (!phone) {
        setMsg("Phone Can't be empty");
        return setShow(true);
      }
      if (!gender) {
        setMsg("Gender Can't be empty");
        return setShow(true);
      }
      if (!jobId) {
        setMsg("Job Name Can't be empty");
        return setShow(true);
      }
      if (!snumber) {
        setMsg("Secret Number Can't be empty");
        return setShow(true);
      }
      if (!email) {
        setMsg("Email Can't be empty");
        return setShow(true);
      }
      if (!password) {
        setMsg("Password Can't be empty");
        return setShow(true);
      }
      if (!rpassword) {
        setMsg("rpassword Can't be empty");
        return setShow(true);
      }
      if (isNumber === false) {
        setMsg("Phone must be number");
        return setShow(true);
      }
      await axios.post(`${server}/register`, {
        first_name: fname,
        last_name: lname,
        job_id: jobId,
        email,
        password,
        re_password: rpassword,
        phone,
        gender,
        secret_number: snumber,
      });
      setMsg(sucess);
      setShow(true);
    } catch (error) {
      setMsg(error.response.data.msg);
      setShow(true);
    }
  };
  return (
    <div className="register-wrap">
      <h1 className="text-center">Let Us Know You</h1>
      <form onSubmit={registHandler} className="mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="fname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="fname"
                className="form-control"
                placeholder="Type your first name"
                value={fname}
                onChange={(e) => {
                  setFname(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="lname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                className="form-control"
                placeholder="Type your lastname"
                value={lname}
                onChange={(e) => {
                  setLname(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                className="form-control"
                placeholder="Type your phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                id="gender"
                className="form-select"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value="Laki - Laki">Male</option>
                <option value="Perempuan">Female</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="job" className="form-label">
                Job Name
              </label>
              <select
                id="job"
                className="form-select"
                value={parseInt(jobId)}
                onChange={(e) => {
                  setJobid(parseInt(e.target.value));
                }}
              >
                <option value={1}>Engineer</option>
                <option value={2}>Internship</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="snumber" className="form-label">
                Secret Number
              </label>
              <input
                type="text"
                id="snumber"
                className="form-control"
                placeholder="Type the number"
                value={snumber}
                onChange={(e) => {
                  setSnumber(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="form-control"
              placeholder="Type your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="pswd" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="pswd"
                className="form-control"
                placeholder="Type your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="repswd" className="form-label">
                Re - type Password
              </label>
              <input
                type="password"
                id="repswd"
                className="form-control"
                placeholder="Re - type password"
                value={rpassword}
                onChange={(e) => {
                  setRpassword(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="btn">Sign Up</button>
        </div>
      </form>
      {msg === null ? (
        ""
      ) : (
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>
              {msg === sucess ? (
                <p className="color-succes">Great</p>
              ) : (
                <p className="color-danger">Sorry</p>
              )}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="text-success d-flex align-items-center">
              <div className="ps-3">{msg}</div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {msg === sucess ? (
              <Button
                variant="success"
                onClick={() => {
                  navigate("/");
                }}
              >
                Login
              </Button>
            ) : (
              ""
            )}
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Register;
