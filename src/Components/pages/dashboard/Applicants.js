import React, { useEffect, useState } from "react";
import Loader from "../../Loader";
import JobCard from "../homepage/JobCard";
import { Link, useParams } from "react-router-dom";
import EmployeeCard from "../homepage/EmployeeCard";
import NoOptions from "../../NoOptions";

export default function Applicants(props) {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/jobs/applicants/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setApplicants(data);
        console.log(data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
        console.log(applicants);
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
  } else if (applicants.length > 0) {
    return (
      <div className="outside-container applied">
        <div className="inner-container">
          {applicants.map((item, index) => {
            return <EmployeeCard key={index} profile={item} />;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="outside-container">
        <div className="inner-container pt-2 pb-2">
          <Link to="/dashboard" className="btn btn-1">
            Back to Dashboard
          </Link>
          <NoOptions warning="There are no current applicants." />
        </div>
      </div>
    );
  }
}
