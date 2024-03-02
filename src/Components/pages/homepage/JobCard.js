import React from "react";
import { NavLink } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { Buffer } from "buffer";

export default function JobCard(props) {
  const { job } = props;
  const background = job.company.backgroundColor;
  const link = `/jobs/profile/${job._id}`;
  return (
    <NavLink to={link} className="job-card">
      <div>
        <div className="company-logo" style={{ backgroundColor: background }}>
          {job.company.companyImage ? (
            <img src={`data:image/jpeg;base64,${Buffer.from(job.company.companyImage, "binary").toString("base64")}`}/>
          ) : (
            <img src="/images/stock-profile.jpg" alt=""/>
          )}
      
        </div>
        <div className="details text-dark-grey mb-2">
          <ReactTimeAgo date={job.postedAt} locale="en-US" /> <span className="fw-900">.</span> {job.contract}{" "}
        </div>
        <h5 className="fw-800 text-black mb-2">{job.position}</h5>
        <div className="company-name text-dark-grey mb-4">{job.company.companyName}</div>
      </div>
      <h6 className="fw-800 text-violet ">{job.company.companyLocation}</h6>
    </NavLink>
  );
}
