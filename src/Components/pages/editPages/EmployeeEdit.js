import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Redirect, Route, useParams } from "react-router-dom";
import Loader from "../../Loader";
import { jwtDecode } from "jwt-decode";

export default function EmployeeEdit(props) {
  const { id } = useParams();
  const [fetchData, setFetchData] = useState({});
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
    linkedIn: "",
    workExperiences: []
  });
  const [error, setError]= useState("")
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const { firstName, lastName, email, linkedIn, phone, password, headline, profilePicture, github, portfolioWebsite, summary } = values;
  const url = process.env.REACT_APP_SERVER;


  let navigate = useNavigate();
  const handleChange = (name) => (event) => {
    const value = name === "profilePicture" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value});

  };

  const handleAddMore= () => {
    setValues(prevState => ({
      ...prevState,
      workExperiences: [...prevState.workExperiences, { company: '', position: '', duration: '' }]
    }));
  };
  const handleRemove = (index) => {
    const newWorkExperiences = [...values.workExperiences];
    newWorkExperiences.splice(index, 1);
    setValues(prevState => {
     
      return { ...prevState, workExperiences: newWorkExperiences };
    });

  };

  const handleWorkExperienceChange = (e, index) => {
    const { name, value } = e.target;
    setValues(prevState => {
      const updatedExperiences = [...prevState.workExperiences];
      updatedExperiences[index][name] = value;
      return { ...prevState, workExperiences: updatedExperiences };
    });
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
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('linkedIn', values.linkedIn);
    formData.append('email', values.email);
    formData.append('profilePicutre', values.profilePicture);
    formData.append('github', values.github);
    formData.append('headline', values.headline);
    formData.append('portfolioWebsite', values.portfolioWebsite);
    formData.append('summary', values.summary);
    formData.append('phone', values.phone);
    formData.append('workExperiences', JSON.stringify(values.workExperiences));
  
    try {
      const response = await axios.put(`${url}/accounts/update/candidate`,formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(jwtDecode(token).userId === id){

   
    fetch(`${url}/accounts/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setValues(data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(!loading);
        
    });
  
      }else{
        navigate('/dashboard',{state:{error:"Cannot edit another user"}});
      }
      
  
  }, []);

  useEffect(() => {
    //   for (const [key, value] of Object.entries(data)) {
    //       console.log({[key]: value})
    //       setValues({...values, [key]: value})
    //     }
    console.log(values);
  }, [values]);

  if (loading) {
    return (
      <div className="outside-container">
        <div className="inner-container loader pt-5 row justify-content-md-center ">
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
          <form onSubmit={submit} encType="multipart/form-data">
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
                <input type="text" name="phone" onChange={handleChange("phone")} value={phone} className="form-control" id="inputPhone" placeholder="888-867-5309"></input>{" "}
              </div>
              <div className="form-group col-md-6">
                <label for="profilePicture" className="text-black fw-800 mb-3">
                  Profile Image
                </label>
                <input type="file" onChange={handleChange("profilePicture")} className="form-control" id="inputProfilePicture" name="profilePicture" accept="image/png, image/jpeg" />
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

            <h3 className="text-black fw-800 mb-3">Work Expirience</h3>
          {values.workExperiences.map((experience, index) => (
            <div className="mb-3" key={index}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="company" className="text-black fw-800 mb-3">
                    Company
                  </label>
                  <input type="text" placeholder="Company" name="company" className="form-control" value={experience.company} onChange={(event) =>handleWorkExperienceChange(event, index)} />
                </div>
                <div className="form-group col-md-6">
                  <label for="position" className="text-black fw-800 mb-3">
                    Positon
                  </label>
                  <input type="text" placeholder="Position" name="position" className="form-control" value={experience.position} onChange={(event) => handleWorkExperienceChange(event, index)} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="duration" className="text-black fw-800 mb-3">
                    Duration
                  </label>

                  <input type="text" placeholder="Duration" name="duration" className="form-control" value={experience.duration} onChange={(event) => handleWorkExperienceChange(event, index)} />
                </div>
              </div>
              <div className="form-group">
                <label for="description" className="text-black fw-800 mb-3">
                  Description
                </label>
                <textarea placeholder="Description" name="description" className="form-control" value={experience.description} onChange={(event) => handleWorkExperienceChange(event, index)} />
              </div>

              <div className="work-expirience-buttons">
              {values.workExperiences.length === 1 && (
                  <button type="button" className="btn btn-2" onClick={handleAddMore}>
                    Add More
                  </button>
                )}
                {index === values.workExperiences.length - 1 && values.workExperiences.length !== 1 && (
                  <>
                    <button type="button" className="btn btn-3 " onClick={() => handleRemove(index)}>
                      Remove
                    </button>
                    <button type="button" className="btn btn-2" onClick={handleAddMore}>
                      Add More
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          <button type="submit" className="btn btn-1">
            Submit
          </button>
          </form>
        </div>
      </div>
    );
  }
}
