import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

export default function JobEdit(props) {
  const { isLoggedIn } = props;
  const params = useParams();
  const {id} = params
  const [values, setValues] = useState({
    position: "",
    contract: "",
    descripton: "",
    requirmentsContent: "",
    requirmentsItems: "",
    roleContent: "",
    roleItems: "",
    portfolioWebsite: "",
  });

  

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { position, contract, description, requirmentsContent, requirmentsItems, roleContent, roleItems } = values;
  let navigate = useNavigate();
  const handleChange = (name) => (event) => {
    const value =  event.target.value;
    setValues({ ...values, [name]: value });
    setError("");
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
    const job = {
      position,
      contract,
      description,
      requirements: {
        content: requirmentsContent,
        items: requirmentsItems.split(". ").map(sentence=>{
          return sentence.trim() +"."
        }),
      },
      role: {
        content: roleContent,
        items: roleItems.split(". ").map(sentence=>{
          return sentence.trim() +"."
        }),
      }
    };

    const token = localStorage.getItem("token")

    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVER}/jobs/editjob/${id}`, job, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };
  useEffect(() => {
    if (isLoggedIn){
      const user = jwtDecode(localStorage.getItem("token"))
      if(user.role !== "admin"){
        navigate("/dashboard")
      }

      fetch(`${process.env.REACT_APP_SERVER}/jobs/findone/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        let content = {}
        content.requirmentsContent = data.requirements.content
        content.requirmentsItems = data.requirements.items.join(". ") 
        content.roleContent = data.role.content
        content.roleItems = data.role.items.join(". ") 
        content.position = data.position
        content.contract = data.contract
        content.description = data.description
        setValues(content);
     
      })
      .catch((err) => console.error(err));
    }else{
      navigate("/login")
    }

  }, []);

  return (
    <div className="outside-container">
      <div className="inner-container pt-2">
        {showSuccess()}
        {showError()}
        <h4 className="text-black fw-800 mb-3">Create Job</h4>
        <form onSubmit={submit} encType="multipart/form-data">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="positon" className="text-black fw-800 mb-3">
                Position
              </label>
              <input onChange={handleChange("position")} value={position} required type="text" name="position" className="form-control" id="inputPosition" placeholder="(e.g. Front End Developer, Full Stack Developer)"></input>
            </div>
            <div className="form-group col-md-6">
              <label for="companyLocation" className="text-black fw-800 mb-3">
                Contract
              </label>
              <select className="form-control" name="contract" onChange={handleChange("contract")} value={contract} id="inputContract">
                <option>Full Time</option>
                <option>Part Time</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label for="summary" className="text-black fw-800 mb-3">
              Description
            </label>
            <textarea type="textarea" onChange={handleChange("description")} value={description} name="descripton" className="form-control" id="inputDescription"></textarea>
          </div>

          <div className="form-group">
            <label for="requirementsContent" className="text-black fw-800 mb-3">
              Requirements Content
            </label>
            <textarea type="textarea" onChange={handleChange("requirmentsContent")} value={requirmentsContent} name="requirementsContent" className="form-control" id="inputRequirementsContent"></textarea>
          </div>

          <div className="form-group">
            <label for="requirementsItems" className="text-black fw-800 mb-3">
              Requirements Items (period sepreated list)
            </label>
            <textarea type="textarea" onChange={handleChange("requirmentsItems")} value={requirmentsItems} name="requirementsItems" className="form-control" id="inputRequirementsItems"></textarea>
          </div>

          <div className="form-group">
            <label for="roleContent" className="text-black fw-800 mb-3">
              What you will do!
            </label>
            <textarea type="textarea" onChange={handleChange("roleContent")} value={roleContent} name="roleContnet" className="form-control" id="inputRoleContent"></textarea>
          </div>

          <div className="form-group">
            <label for="roleItems" className="text-black fw-800 mb-3">
              Role Items (period sepreated list)
            </label>
            <textarea type="textarea" onChange={handleChange("roleItems")} value={roleItems} name="roleItems" className="form-control" id="inputRoleItems"></textarea>
          </div>

          <button type="submit" className="btn btn-1">
            Edit Job
          </button>
        </form>
      </div>
    </div>
  );
}
