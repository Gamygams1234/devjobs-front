import "./App.scss";
import { useState, useEffect } from "react";
import data from "./data.json";
import Header from "./Components/Header";
import Homepage from "./Components/pages/homepage/Homepage";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, Link } from "react-router-dom";
import {clsx} from "clsx";
import { jwtDecode } from 'jwt-decode';
import JobPage from "./Components/pages/joppage/JobPage";
import SignUpEmployee from "./Components/pages/signup.js/SignUpEmployee";
import SignUpEmployer from "./Components/pages/signup.js/SignUpEmployer";
import Login from "./Components/pages/login/Login";
import Dashboard from "./Components/pages/dashboard/Dashboard";
import UserProfile from "./Components/userProfile/UserProfile";
import EmployeeEdit from "./Components/pages/editPages/EmployeeEdit";
import JobCreate from "./Components/pages/jobsCreate/JobCreate";
import AdminEdit from "./Components/pages/editPages/AdminEdit";
import AppliedJobs from "./Components/pages/dashboard/AppliedJobs";
import Applicants from "./Components/pages/dashboard/Applicants";
import JobEdit from "./Components/pages/editPages/JobEdit";
import EmployerJobs from "./Components/pages/dashboard/EmployerJobs";



function App() {


  const [theme, setTheme] = useState("light")
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);
  const classNames = clsx([theme, "App"])
  const [jobs, setJobs] = useState(data)
  const [user, setUser]= useState(null)
  const [displayJobs, setDisplayJobs] = useState([])

  useEffect(()=>{
    jobs.forEach(job=>{
      job.applied = false
    })
    if (localStorage.getItem('token')){
      setUser(jwtDecode(localStorage.getItem('token')))
    }
  },[])
  // login function
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null)
  };

  useEffect(()=>{
    if (localStorage.getItem('token')){
      setUser(jwtDecode(localStorage.getItem('token')))
      console.log(jwtDecode(localStorage.getItem('token')))
    }
  },[isLoggedIn])

  return (
    <div className={classNames}>
      <Header handleThemeChange={setTheme} theme={theme} onLogout={handleLogout}  loggedIn={isLoggedIn}></Header>
      <Routes>
        <Route path="/" element={<Homepage jobs={jobs}></Homepage>}></Route>
        <Route path="/jobs/profile/:id" element={<JobPage   isLoggedIn = {isLoggedIn} />} ></Route>
        <Route path="/jobs/applicants/:id" element={<Applicants  isLoggedIn = {isLoggedIn} />} ></Route>
        <Route path="/jobs/company/:id" element={<EmployerJobs  isLoggedIn = {isLoggedIn} />} ></Route>
        <Route path="/signup/employee" element={<SignUpEmployee />}  ></Route>
        <Route path="/signup/employer" element={<SignUpEmployer />}  ></Route>
        <Route path="/admin/create/job" element={<JobCreate isLoggedIn={isLoggedIn} />}  ></Route>
        <Route path="/admin/profile/update/:id" element={<AdminEdit isLoggedIn={isLoggedIn} />}  ></Route>
        <Route path="/user/applied/:id" element={<AppliedJobs isLoggedIn={isLoggedIn} />}  ></Route>
        <Route path="/edit/user/:id" element={<EmployeeEdit isLoggedIn={isLoggedIn} />}  ></Route>
        <Route path="/edit/jobs/:id" element={<JobEdit isLoggedIn={isLoggedIn} />}  ></Route>
        <Route path="/user/profile/:id/" element={<UserProfile  isLoggedIn={isLoggedIn} />}  ></Route>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> :<Login onLogin={handleLogin} />} ></Route>
        <Route path="/dashboard" element={!isLoggedIn ? <Navigate to="/" /> :<Dashboard isLoggedIn= {isLoggedIn} />} ></Route>
      </Routes>
    </div>
  );
}

export default App;
