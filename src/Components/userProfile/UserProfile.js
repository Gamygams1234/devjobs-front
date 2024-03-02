import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Loader from "../Loader";
import { Buffer } from "buffer";


export default function UserProfile(props) {
  const { id } = useParams();

  const [profileUser, setProfileUser] = useState(null);
  const [currentUser, setCurrentUser]= useState(null)
  const {isLoggedIn} = props;
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/accounts/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProfileUser(data);
        console.log(data);
      })
      .catch((err) => console.error(err));
      if (isLoggedIn){
        setCurrentUser(jwtDecode(localStorage.getItem("token")))
      }

     
  }, []);

  if (!profileUser) {
    return (
      <div className="outside-container">
        <div className="inner-container pt-5 row justify-content-md-center ">
          <Loader />
        </div>
      </div>
    );
  } else {
    // let displayImage = Buffer.from(profileUser.profilePicture, "binary").toString("base64");

    return (
      <div className="outside-container profile">
        <div className="inner-container">
          <div className="profile-banner bg-white-1">
            <div className="profile-picture">{profileUser.profilePicture ? <img src={`data:image/jpeg;base64,${Buffer.from(profileUser.profilePicture, "binary").toString("base64")}`} alt="" /> : <img src="/images/stock-profile.jpg" alt="" />} </div>
            <div className="details">
              <h5 className="text-black fw-700 mb-1">
                {profileUser.firstName} {profileUser.lastName}
              </h5>
              <p className="text-dark-grey">{profileUser.portfolioWebsite ? profileUser.portfolioWebsite : "No Portfolio Available"}</p>
            </div>
            {currentUser.userId === id &&  <div className="button">
              <button className="btn btn-2">Company Site</button>
            </div>}
            
          </div>

          
          {/* <div className="profile-description bg-white-1  mb-4">
            <div className="top-job-section mb-5 ">
              <div className="left-side">
                <div className="details text-dark-grey mb-2">
                  {job.postedAt} <span className="fw-900">.</span> {job.contract}{" "}
                </div>
                <h5 className="fw-800 text-black mb-2">{job.position}</h5>
                <h6 className="fw-800 text-violet ">{job.location}</h6>
              </div>
              <div className="right-side">
              {job.applied?<button  disabled className="btn btn-1">Applied</button>:<button onClick={applyJob} className="btn btn-1">Apply Now</button>}
              </div>
            </div>
            <div className="main-section ">
              <p className="text-dark-grey mb-4">{job.description}</p>
              <h5 className="text-black fw-800 mb-4">Requirements</h5>
              <p className="text-dark-grey mb-5">{job.requirements.content}</p>
              <ul className="mb-5">
                {job.requirements.items.map((item) => {
                  return <li className="text-dark-grey mb-3">{item}</li>;
                })}
              </ul>
              <h5 className="text-black fw-800 mb-4">What You Will Do</h5>

              <p className="text-dark-grey mb-5">{job.role.content}</p>
              <ol className="">
                {job.role.items.map((item) => {
                  return <li className="text-dark-grey mb-3">{item}</li>;
                })}
              </ol>
            </div>
          </div> */}


        </div>
      </div>
    );
  }
}
