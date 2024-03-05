import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../Loader";
import ReactTimeAgo from "react-time-ago";
import { jwtDecode } from "jwt-decode";
import { Buffer } from "buffer";
import axios from "axios";

export default function JobPage(props) {
  const { isLoggedIn } = props;
  const params = useParams();
  // const job = jobs.filter((job) => {
  //   return job.id.toString() === params.id;
  // })[0];
  const [user, setUser] = useState(null);
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const url = process.env.REACT_APP_SERVER;

  const applyJob = async () => {
    try {
      const response = await axios.put(
        `${url}/jobs/apply/${params.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setApplied(true);
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      setUser(jwtDecode(localStorage.getItem("token")));
    }
    fetch(`${process.env.REACT_APP_SERVER}/jobs/findone/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setJob(data);
        let user = jwtDecode(localStorage.getItem("token"));
        if (data.applicants.map(item=>{
          return item.applicant
        }).includes(user.userId)) {
          setApplied(true);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (!job) {
    return (
      <div className="outside-container">
        <div className="inner-container loader pt-5 row justify-content-md-center ">
          <Loader />
        </div>
      </div>
    );
  } else if (!isLoggedIn) {
    return (
      <>
        <div className="outside-container jobpage ">
          <div className="inner-container ">
            <div className="job-banner bg-white-1">
              <div className="logo" style={{ backgroundColor: job.company.backgroundColor }}>
                {job.company.companyImage ? <img src={`data:image/jpeg;base64,${Buffer.from(job.company.companyImage, "binary").toString("base64")}`} /> : <img src="/images/stock-profile.jpg" alt="" />}
              </div>
              <div className="details">
                <h5 className="text-black fw-700 mb-1">{job.company.companyName}</h5>
                <p className="text-dark-grey">{job.company.companyWebsite}</p>
              </div>
              <div className="button">
                <button className="btn btn-2">Company Site</button>
              </div>
            </div>

            <div className="job-description bg-white-1  mb-4">
              <div className="top-job-section mb-5 ">
                <div className="left-side">
                  <div className="details text-dark-grey mb-2">
                    <ReactTimeAgo date={job.postedAt} locale="en-US" /> <span className="fw-900">.</span> {job.contract}{" "}
                  </div>
                  <h5 className="fw-800 text-black mb-2">{job.position}</h5>
                  <h6 className="fw-800 text-violet ">{job.company.companyLocation}</h6>
                </div>
                <div className="right-side">
                  <Link to="/login" disabled className="btn btn-1">
                    Login to Apply
                  </Link>
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
            </div>
          </div>
        </div>
        <div className=" outside-container jobpage jobpage-footer bg-white-1">
          <div className="inner-container">
            <div className="footer-details">
              <h5 className="fw-800 text-black mb-2">{job.position}</h5>
              <div className="text-dark-grey">{job.company.companyLocation}</div>
            </div>

            <Link to="/login" disabled className="btn btn-1">
              Login to Apply
            </Link>
          </div>
        </div>
      </>
    );
  } else if (user.role === "candidate") {
    return (
      <>
        <div className="outside-container jobpage ">
          <div className="inner-container ">
            <div className="job-banner bg-white-1">
              <div className="logo" style={{ backgroundColor: job.company.backgroundColor }}>
                {job.company.companyImage ? <img src={`data:image/jpeg;base64,${Buffer.from(job.company.companyImage, "binary").toString("base64")}`} /> : <img src="/images/stock-profile.jpg" alt="" />}
              </div>
              <div className="details">
                <h5 className="text-black fw-700 mb-1">{job.company.companyName}</h5>
                <p className="text-dark-grey">{job.company.companyWebsite}</p>
              </div>
              <div className="button">
                <button className="btn btn-2">Company Site</button>
              </div>
            </div>

            <div className="job-description bg-white-1  mb-4">
              <div className="top-job-section mb-5 ">
                <div className="left-side">
                  <div className="details text-dark-grey mb-2">
                    <ReactTimeAgo date={job.postedAt} locale="en-US" /> <span className="fw-900">.</span> {job.contract}{" "}
                  </div>
                  <h5 className="fw-800 text-black mb-2">{job.position}</h5>
                  <h6 className="fw-800 text-violet ">{job.company.companyLocation}</h6>
                </div>
                <div className="right-side">
                  {applied ? (
                    <button disabled className="btn btn-1">
                      Applied
                    </button>
                  ) : (
                    <button onClick={applyJob} className="btn btn-1">
                      Apply Now
                    </button>
                  )}
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
            </div>
          </div>
        </div>
        <div className=" outside-container jobpage jobpage-footer bg-white-1">
          <div className="inner-container">
            <div className="footer-details">
              <h5 className="fw-800 text-black mb-2">{job.position}</h5>
              <div className="text-dark-grey">{job.company.companyLocation}</div>
            </div>
            {applied ? (
              <button disabled className="btn btn-1">
                Applied
              </button>
            ) : (
              <button onClick={applyJob} className="btn btn-1">
                Apply Now
              </button>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="outside-container jobpage ">
          <div className="inner-container ">
            <div className="job-banner bg-white-1">
              <div className="logo" style={{ backgroundColor: job.company.backgroundColor }}>
                {job.company.companyImage ? <img src={`data:image/jpeg;base64,${Buffer.from(job.company.companyImage, "binary").toString("base64")}`} /> : <img src="/images/stock-profile.jpg" alt="" />}
              </div>
              <div className="details">
                <h5 className="text-black fw-700 mb-1">{job.company.companyName}</h5>
                <p className="text-dark-grey">{job.company.companyWebsite}</p>
              </div>
              <div className="button">
              
              {user.userId === job.company._id && <Link to={`/jobs/applicants/${job._id}`} className="btn btn-2">View Applicants</Link>}

              </div>
            </div>

            <div className="job-description bg-white-1  mb-4">
              <div className="top-job-section mb-5 ">
                <div className="left-side">
                  <div className="details text-dark-grey mb-2">
                    <ReactTimeAgo date={job.postedAt} locale="en-US" /> <span className="fw-900">.</span> {job.contract}{" "}
                  </div>
                  <h5 className="fw-800 text-black mb-2">{job.position}</h5>
                  <h6 className="fw-800 text-violet ">{job.company.companyLocation}</h6>
                </div>
                <div className="right-side">{user.userId === job.company._id && <Link to={`/edit/jobs/${params.id}`}className="btn btn-1">Edit Job</Link>}</div>
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
            </div>
          </div>
        </div>
        <div className=" outside-container jobpage jobpage-footer bg-white-1">
          <div className="inner-container">
            <div className="footer-details">
              <h5 className="fw-800 text-black mb-2">{job.position}</h5>
              <div className="text-dark-grey">{job.company.companyLocation}</div>
            </div>
            {user.userId === job.company._id && <button className="btn btn-1">Edit Job</button>}
          </div>
        </div>
      </>
    );
  }
}
