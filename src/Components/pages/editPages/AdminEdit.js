import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Redirect, Route, useParams } from "react-router-dom";
import Loader from "../../Loader";
import { jwtDecode } from "jwt-decode";

export default function AdminEdit(props) {
  const { id } = useParams();
  const [fetchData, setFetchData] = useState({});
  const [values, setValues] = useState({
    companyName: "",
    backgroundColor: "",
    companyLocation: "",
    companyImage: "",
    companyPhone: "",
    password: "",
    email: "",
    website: "",
  });
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const { companyName, backgroundColor, companyLocation, companyImage, email, website, companyPhone, password } = values;
  const url = process.env.REACT_APP_SERVER;

  let navigate = useNavigate();
  const handleChange = (name) => (event) => {
    const value = name === "companyImage" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

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
    const formData = new FormData();
    for (const key in values) {
      formData.set(key, values[key]);
    }

    try {
      const response = await axios.put(`${url}/accounts/update/admin`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/login");
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (jwtDecode(token).userId === id) {
      fetch(`${url}/accounts/users/${id}`)
        .then((response) => response.json())
        .then((data) => {
       
          setValues(data);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setLoading(!loading);
        });
    } else {
      navigate("/dashboard", { state: { error: "Cannot edit another user" } });
    }
  }, []);



  if (loading) {
    return (
      <div className="outside-container">
        <div className="inner-container pt-5 row justify-content-md-center ">
          <Loader />
        </div>
      </div>
    );
  } else {
    return (
      <div className="outside-container">
        <div className="inner-container pt-2">
          {showSuccess()}
          {showError()}

          <h2 className="text-black fw-800 mb-4">Edit Details</h2>
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
                <label for="companyLocation" className="text-black fw-800 mb-3">
                  Company Location
                </label>
                <select className="form-control" name="companyLocation" onChange={handleChange("companyLocation")} value={companyLocation} id="inputCompanyLocation">
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Germany</option>
                  <option>Japan</option>
                  <option>New Zeland</option>
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
                <input type="file" onChange={handleChange("companyImage")} className="form-control" id="inputCompanyImage" name="companyImage" accept="image/png, image/jpeg" />
              </div>
            </div>

            <button type="submit" className="btn btn-1">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
