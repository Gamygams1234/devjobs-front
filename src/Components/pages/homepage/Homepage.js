import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import Loader from "../../Loader";
import SearchBar from "../../SearchBar";
import NoOptions from "../../NoOptions";

export default function (props) {
  const { jobs } = props;

  const [limit, setLimit] = useState(12);
  const [allJobs, setAllJobs] = useState([]);
  const [displayJobs, setDisplayJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const increaseJobs = () => {
    setLimit(limit + 6);
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/jobs/all`)
      .then((response) => response.json())
      .then((data) => {

        setAllJobs(data);
        setDisplayJobs(data);
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
  } else if (allJobs.length >=1) {
    return (
      <div className="outside-container pb-3 home">
      <SearchBar allJobs={allJobs} setDisplayJobs={setDisplayJobs} />
      {displayJobs.length >0 ? 
        <>
        
        <div className="inner-container">
          {displayJobs
            .map((item, index) => {
              return <JobCard key={index} job={item} />;
            }).reverse()
            .slice(0, limit)}
        </div>
        <div className="load-more">

        
          {limit < displayJobs.length && (
            <button onClick={increaseJobs} className="btn btn-1 ">
              Load More
            </button>
          )}
        </div>
        </>
      :
 
        <NoOptions warning="Sorry, no jobs match that criteria." secondWarning = "Please search again." />
     
      
      }

      </div>
    );
  } else{ return(


    <div className="outside-container pb-3 home">
    <NoOptions  warning="Sorry, there are no jobs yet." secondWarning="Jobs will be added soon."/>

    </div>  )
  }
}
