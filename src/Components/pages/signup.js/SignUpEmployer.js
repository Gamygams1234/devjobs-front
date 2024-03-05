import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Redirect,Route  } from 'react-router-dom';


export default function SignUpEmployer() {
  const [values, setValues] = useState({
    companyName: "",
    email: "",
    password: "",
    portfolioWebsite: "",
    website: "",
    companyLocation: "United States",
    error: "",
    companyImage: "", 
    companyPhone: "",
    backgroundColor: "black",
    formData: new FormData(),
  });
  const [success, setSuccess] = useState(false);
  const { companyName, email, password, companyLocation, website,  backgroundColor, companyPhone, companyImage,   formData, error } = values;

  const handleChange = (name) => (event) => {
    const value = name === "companyImage" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, error: "" });
  };
  let navigate = useNavigate();

  const showSuccess = () => (
    <div className="alert alert-success" style={{ display: success ? "" : "none" }}>
      The new category, {success}, has been added.
    </div>
  );
  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const submit = async (event) => {
    event.preventDefault();
    formData.set("companyLocation", companyLocation);
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER}/accounts/create/admin`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/login")
    } catch (error) {

      console.error("Error uploading file: ", error);
      setValues({ ...values, error: error.response.data.message });
    }
  };

  return (
    <div className="outside-container">
      <div className="inner-container pt-2 pb-2">
        {showSuccess()}
        {showError()}
        <form onSubmit={submit} encType="multipart/form-data">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="companyName" className="text-black fw-800 mb-3">
                Company Name
              </label>
              <input required type="text" onChange={handleChange("companyName")} value={companyName} className="form-control" id="inputLastName" placeholder="(e.g., Google, Facebook)"></input>
            </div>
            <div className="form-group col-md-6">
              <label for="email" className="text-black fw-800 mb-3">
                Email
              </label>
              <input onChange={handleChange("email")} value={email} required type="email" name="email" className="form-control" id="inputEmail" placeholder="companyname@gmail.com"></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="password" className="text-black fw-800 mb-3">
                Password
              </label>
              <input required type="password" onChange={handleChange("password")} value={password} name="password" className="form-control" id="inputPassword"></input>
            </div>
            <div className="form-group col-md-6">
              <label for="companyLocation" className="text-black fw-800 mb-3">
                Company Location
              </label>
              <select className="form-control" name="companyLocation" onChange={handleChange("companyLocation")} value={companyLocation} id="inputCompanyLocation">
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Germany</option>
                <option>Japan</option>
                <option>New Zealand</option>
                <option>Russia</option>
                <option>Singapore</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="phone" className="text-black fw-800 mb-3">
                Phone
              </label>
              <input type="text" name="phone" onChange={handleChange("companyPhone")} value={companyPhone} className="form-control" id="inputPhone" placeholder="951-867-5309"></input>
            </div>
            <div className="form-group col-md-6">
              <label for="website" className="text-black fw-800 mb-3">
                Website
              </label>
              <input type="text" name="website" onChange={handleChange("website")} value={website} className="form-control" id="inputWebsite"></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="backgroundColor" className="text-black fw-800 mb-3">
                Background Color
              </label>
              <input type="color" value={backgroundColor} name="backgroundColor" onChange={handleChange("backgroundColor")} className="form-control" id="inputHeadline" placeholder="Web Developer"></input>{" "}
            </div>
            <div className="form-group col-md-6">
              <label for="companyImage" className="text-black fw-800 mb-3">
                Company Image
              </label>
              <input type="file" onChange={handleChange("companyImage")}  className="form-control" id="inputCompanyImage" name="companyImage" accept="image/png, image/jpeg" />
            </div>
          </div>


          <button type="submit" className="btn btn-1">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
