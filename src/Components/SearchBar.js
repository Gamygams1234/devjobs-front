import React, { useState } from "react";
import "../Search.scss";

import clsx from "clsx";
export default function SearchBar(props) {
  const [modal, setModal] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("false");
  const [fullTime, setFullTime] = useState(false);
  const checkbox1 = document.getElementById("checkbox-1");
  const checkbox2 = document.getElementById("checkbox-2");

  const {  allJobs, setDisplayJobs } = props;
  const classNames = clsx(["header-filters-popup", modal]);

  const handleModalClick = () => {
    if (modal === "") {
      setModal("is-active");
    } else {
      setModal("");
    }
  };
  const handleCheck = (e) => {
    if (e.checked) {
      // Respond to the result
      setFullTime(true);
      checkbox1.checked = true;
      checkbox2.checked = true;
    } else {
      setFullTime(false);
      checkbox1.checked = false;
      checkbox2.checked = false;
    }
  };
  const submit = () => {

    if (fullTime){
        if (location === "false"){
            setDisplayJobs(allJobs.filter((job)=>{
                return job.position.toLowerCase().includes(title.toLowerCase()) && job.contract.toLowerCase() === "full time"
            }))
        }else{
            setDisplayJobs(allJobs.filter((job)=>{
                return job.position.toLowerCase().includes(title.toLowerCase()) && job.company.companyLocation.toLowerCase() === location.toLowerCase() && job.contract.toLowerCase() === "full time"
            }))
        }
    }else{
        if (location === "false"){
            setDisplayJobs(allJobs.filter((job)=>{
                return job.position.toLowerCase().includes(title.toLowerCase())
            }))
         
        }else{
            setDisplayJobs(allJobs.filter((job)=>{
                return job.position.toLowerCase().includes(title.toLowerCase()) && job.company.companyLocation.toLowerCase() === location.toLowerCase()
            }))
        }
    
    }

    setModal("");
  };
  return (
    <div className="header-filters">
      <section className="header-filters-bar-container">
        <section className="header-filters-bar">
          <input
            type="search"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            placeholder="Filter by title, companies, expertise…"
            className="search-input"></input>
          <input
            type="search"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            placeholder="Filter by title…"
            className="search-input-mobile"></input>
          <select
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            value={location}
            className="location-input is-placeholder">
            <option value="false">Filter by location…</option>
            <option value="Germany">Germany</option>
            <option value="Japan">Japan</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Russia">Russia</option>
            <option value="Singapore">Singapore</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
          </select>
          <label className="type-filter-container">
            <input
              id="checkbox-1"
              value={fullTime}
              onClick={(e) => {
                handleCheck(e.target);
              }}
              type="checkbox"></input>
            <span className="text-black">
              Full Time<span>&nbsp;Only</span>
            </span>
          </label>
          <button onClick={handleModalClick} className="filter-trigger-mobile "></button>
          <button onClick={submit} className="filter-button btn btn-1">
            <span>Search</span>
          </button>
        </section>
      </section>
      <section className={classNames}>
        <div onClick={handleModalClick} className="popup-overlay"></div>
        <section className="popup-container">
          <select
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            className="location-input is-placeholder">
            <option value="false">Filter by location…</option>
            <option value="Germany">Germany</option>
            <option value="Japan">Japan</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Russia">Russia</option>
            <option value="Singapore">Singapore</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
          </select>
          <label className="type-filter-container">
            <input
              id="checkbox-2"
              value={fullTime}
              onClick={(e) => {
                handleCheck(e.target);
              }}
              type="checkbox"></input>
            <span className="text-black">
              Full Time<span>&nbsp;Only</span>
            </span>
          </label>
          <button onClick={submit} className="filter-button btn btn-1">
            Search
          </button>
        </section>
      </section>
    </div>
  );
}
