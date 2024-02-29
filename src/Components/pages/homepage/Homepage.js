import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import Loader from "../../Loader";

export default function (props) {
  const { jobs } = props;

  const [limit, setLimit] = useState(12);
  const [allJobs, setAllJobs] = useState([]);

  const increaseJobs = () => {
    setLimit(limit + 6);
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/jobs/all`)
      .then((response) => response.json())
      .then((data) => setAllJobs(data))
      .catch((err) => console.error(err))
      .finally(() => {
        console.log(`${process.env.REACT_APP_SERVER}/jobs/all`);
      });
  }, []);
  if (!allJobs) {
    return (
      <div className="outside-container">
        <div className="inner-container pt-5 row justify-content-md-center ">
          <Loader />
        </div>
      </div>
    );
  } else {
    return (
      <div className="outside-container home">
        <div className="inner-container">
          {allJobs
            .map((item, index) => {
              return <JobCard key={index} job={item} />;
            })
            .slice(0, limit)}
        </div>
        <div className="load-more">
          {limit < allJobs.length && (
            <button onClick={increaseJobs} className="btn btn-1 ">
              Load More
            </button>
          )}
        </div>
      </div>
    );
  }
}
