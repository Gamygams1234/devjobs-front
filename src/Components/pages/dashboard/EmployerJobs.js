import React, { useState, useEffect } from "react";
import JobCard from "../homepage/JobCard";
import Loader from "../../Loader";

import NoOptions from "../../NoOptions";
import { useParams } from "react-router-dom";

export default function EmployerJobs(props) {
  const { jobs, companyName } = props;
  const params = useParams();

  const [limit, setLimit] = useState(12);
  const [allJobs, setAllJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const increaseJobs = () => {
    setLimit(limit + 6);
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/jobs/all`)
      .then((response) => response.json())
      .then((data) => {
        setAllJobs(data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="outside-container">
        <div className="inner-container loader pt-5 row justify-content-md-center ">
          <Loader />
        </div>
      </div>
    );
  } else if (
    allJobs.filter((job) => {
      return job.company._id === params.id;
    }).length >= 1
  ) {
    return (
      <div className="outside-container pb-3 home">
        {allJobs.length > 0 ? (
          <>
            <div className="inner-container">
              {allJobs
                .filter((job) => {
                  return job.company._id === params.id;
                })
                .map((item, index) => {
                  return <JobCard key={index} job={item} />;
                })
                .slice(0, limit)}
            </div>
            <div className="load-more">
              {limit <
                allJobs.filter((job) => {
                  return job.company._id === params.id;
                }).length && (
                <button onClick={increaseJobs} className="btn btn-1 ">
                  Load More
                </button>
              )}
            </div>
          </>
        ) : (
          <NoOptions warning="You have no jobs created." secondWarning="Please create a job." />
        )}
      </div>
    );
  }
}
