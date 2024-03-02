import React from "react";
import { NavLink } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { Buffer } from "buffer";

export default function EmployeeCard(props) {
  const { profile } = props;
  const background = "white";
  const link = `/user/profile/${profile.applicant._id}`;
  return (
    <NavLink to={link} className="job-card">
      <div>
        <div className="company-logo" style={{ backgroundColor: background }}>
          {profile.applicant.profileImage ? (
            <img src={`data:image/jpeg;base64,${Buffer.from(profile.profilePicture, "binary").toString("base64")}`}/>
          ) : (
            <img src="/images/stock-profile.jpg" alt=""/>
          )}
      
        </div>
        <div className="details text-dark-grey mb-2">
          <ReactTimeAgo date={profile.appliedAt} locale="en-US" /> 
        </div>
        <h5 className="fw-800 text-black mb-2">{profile.applicant.firstName} {profile.applicant.lastName}</h5>

      </div>

    </NavLink>
  );
}
