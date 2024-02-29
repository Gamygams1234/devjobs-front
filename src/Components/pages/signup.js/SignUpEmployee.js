import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, Redirect,Route  } from 'react-router-dom';



export default function SignUpEmployee() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePicture: "",
    github: "",
    headline: "",
    portfolioWebsite: "",
    summary: "",
    phone: "",
    linkedIn : "",
    error: "",
    formData: new FormData(),
  });
  const [success, setSuccess] = useState(false);
  const { firstName, lastName, email, linkedIn, phone, password, headline, profilePicture, github, portfolioWebsite, summary, formData, error } = values;
  let navigate = useNavigate();
  const handleChange = (name) => (event) => {
    const value = name === "profilePicture" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, error: "" });
    console.log(formData)
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
    // const formData = new FormData();
    // formData.append('profilePicture', file);
    try {
      const response = await axios.post("http://localhost:5000/accounts/create/candidate", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      navigate("/login")
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  };
  
  return (
    <div className="outside-container">
      <div className="inner-container pt-2">
        {showSuccess()}
        {showError()}
        <form onSubmit={submit}  encType="multipart/form-data">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="firstName" className="text-black fw-800 mb-3">
                First Name
              </label>
              <input onChange={handleChange("firstName")} value={firstName} required type="text" name="firstName" className="form-control" id="inputFirstName" placeholder="John"></input>
            </div>
            <div className="form-group col-md-6">
              <label for="lastName" className="text-black fw-800 mb-3">
                Last Name
              </label>
              <input required type="text" onChange={handleChange("lastName")} value={lastName} className="form-control" id="inputLastName" placeholder="Smith"></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="email" className="text-black fw-800 mb-3">
                Email
              </label>
              <input required onChange={handleChange("email")} value={email} type="email" name="email" className="form-control" id="inputEmail" placeholder="johnsmith@gmail.com"></input>
            </div>
            <div className="form-group col-md-6">
              <label for="password" className="text-black fw-800 mb-3">
                Password
              </label>
              <input required type="password" onChange={handleChange("password")} value={password} name="password" className="form-control" id="inputPassword"></input>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="github" className="text-black fw-800 mb-3">
                Github
              </label>
              <input type="text" name="github" onChange={handleChange("github")} value={github} className="form-control" id="inputGithub" placeholder="github.com/johnsmith"></input>
            </div>
            <div className="form-group col-md-6">
              <label for="portfolioWebsite" className="text-black fw-800 mb-3">
                Portfolio
              </label>
              <input type="text" name="portfolioWebsite" onChange={handleChange("portfolioWebsite")} value={portfolioWebsite} className="form-control" id="inputPortfolioWebsite" placeholder="johnsmith.com"></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="phone" className="text-black fw-800 mb-3">
                Phone
              </label>
              <input type="text" name="phone" onChange={handleChange("phone")} value={phone} className="form-control" id="inputHeadline" placeholder="888-867-5309"></input>{" "}
            </div>
            <div className="form-group col-md-6">
              <label for="profilePicture" className="text-black fw-800 mb-3">
                Profile Image
              </label>
              <input type="file" onChange={handleChange("profilePicture")}  className="form-control" id="inputProfilePicture" name="profilePicture" accept="image/png, image/jpeg" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="linkedIn" className="text-black fw-800 mb-3">
                Linked In
              </label>
              <input type="text" name="linkedIn" onChange={handleChange("linkedIn")} value={linkedIn} className="form-control" id="inputLinkedIn" placeholder="LinkedIn Handle here"></input>{" "}
            </div>
          </div>
          <div className="form-group">
            <label for="headline" className="text-black fw-800 mb-3">
              Headline
            </label>
            <input type="text" name="headline" onChange={handleChange("headline")} value={headline} className="form-control" id="inputHeadline" placeholder="Web Developer"></input>{" "}
          </div>
          <div className="form-group">
            <label for="summary" className="text-black fw-800 mb-3">
              Summary
            </label>
            <textarea type="textarea" onChange={handleChange("summary")} value={summary} name="summary" className="form-control" id="inputSummary" placeholder="I am a web developer from Riverside California"></textarea>
          </div>

          <button type="submit" className="btn btn-1">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
