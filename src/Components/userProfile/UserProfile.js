import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Loader from "../Loader";
import { Buffer } from "buffer";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default function UserProfile(props) {
  const { id } = useParams();

  const [profileUser, setProfileUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { isLoggedIn } = props;
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/accounts/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProfileUser(data);
      })
      .catch((err) => console.error(err));
    if (isLoggedIn) {
      setCurrentUser(jwtDecode(localStorage.getItem("token")));
    }
  }, []);

  if (!profileUser) {
    return (
      <div className="outside-container">
        <div className="inner-container loader pt-5 row justify-content-md-center ">
          <Loader />
        </div>
      </div>
    );
  } else {
    // let displayImage = Buffer.from(profileUser.profilePicture, "binary").toString("base64");

    return (
      <div className="outside-container profile pb-4">
        <div className="inner-container">
          <div className="profile-banner bg-white-1">
            <div className="profile-picture">{profileUser.profilePicture ? <img src={`data:image/jpeg;base64,${Buffer.from(profileUser.profilePicture, "binary").toString("base64")}`} alt="" /> : <img src="/images/stock-profile.jpg" alt="" />} </div>
            <div className="details">
              <h5 className="text-black fw-700 mb-1">
                {profileUser.firstName} {profileUser.lastName}
              </h5>
              <p className="text-dark-grey">{!profileUser.headline || profileUser.headline === "undefined" ? "No Headline Available" : profileUser.headline}</p>
            </div>
            {currentUser.userId !== id && profileUser.portfolioWebsite && profileUser.portfolioWebsite !== "undefined" && (
              <div className="button">
                <Link to={profileUser.portfolioWebsite} className="btn btn-2">
                  Go to Portfolio
                </Link>
              </div>
            )}
          </div>

          <div className="resume bg-white-1  ">
            <div class="row mb-3">
            {profileUser.linkedIn &&

           
              <div class=" col-md-6">
                <Link to={`https://www.linkedin.com/in/${profileUser.linkedIn}`}>
                  <FontAwesomeIcon icon={faLinkedin} />{" "}{profileUser.linkedIn}
                </Link>
              </div>
            }
            {profileUser.github &&
              <div class="col-md-6">
                <Link to={`https://github.com/${profileUser.github}`}>
                  <FontAwesomeIcon icon={faGithub} /> {" "}{profileUser.github}
                </Link>
              </div>}
            </div>
            
            <div class="row mb-3">
            {profileUser.phone &&
              <div class=" col-md-6">
                <Link>
                  <FontAwesomeIcon icon={faPhone} />{" "}{profileUser.phone}
                </Link>
              </div>}
            
            </div>
            {profileUser.summary && (
              <div className="summary mt-5">
                <h3 className="fw-800 text-black mb-2">Summary</h3>
                <p className="fw-600 text-black mb-2">{profileUser.summary} </p>
              </div>
            )}

            <div className="work-expirience mt-5">
              <h3 className="fw-800 text-black mb-4">Work Expirience</h3>

              {profileUser.workExperiences.map((item, key) => {
                return (
                  <div className="mb-3" key={key}>
                    <div className="job row mb-3" key={key}>
                      <div class=" col-md-6">
                        <h5 className="fw-800 text-black mb-2">Company:</h5>
                        <p className="fw-600 text-black mb-2">{item.company}</p>
                      </div>
                      <div class="col-md-6">
                        <h5 className="fw-800 text-black mb-2">Position:</h5>
                        <p className="fw-600 text-black mb-2">{item.position}</p>
                      </div>
                    </div>
                    <div className="job row mb-3">
                      <div class=" col-md-6">
                        <h5 className="fw-800 text-black mb-2">Duration:</h5>
                        <p className="fw-600 text-black mb-2">{item.duration}</p>
                      </div>
                    </div>
                    <div className="job row mb-3">
                      <div className="col-md-12">
                        <h5 className="fw-800 text-black mb-2">Description:</h5>
                        <p className="fw-600 text-black mb-2">{item.description}</p>
                      </div>

                      
                    </div>
                  </div>
                );
              })}
            </div>
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
