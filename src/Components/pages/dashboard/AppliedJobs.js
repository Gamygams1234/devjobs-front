import React, { useEffect, useState } from "react";
import Loader from "../../Loader";

import { useParams } from 'react-router-dom';
import EmployeeCard from "../homepage/EmployeeCard";
import JobCard from "../homepage/JobCard";

export default function AppliedJobs(props) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/jobs/findbyuser/${id}`)
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err))
      .finally(()=>{
        setLoading(false)
      })
  }, []);

  if (loading) {
    return (
      <div className="outside-container">
        <div className="inner-container loader pt-5 row justify-content-md-center ">
          <Loader />
        </div>
      </div>
    );
  } else if (jobs.length > 0) {
    return (
      <div className="outside-container applied">
        <div className="inner-container">
          {jobs.map((item, index) => {
            return <JobCard key={index} job={item} />;
          })}
        </div>
      </div>
    );
  } else {
    return <div>You have not applied to any jobs yet</div>;
  }
}
