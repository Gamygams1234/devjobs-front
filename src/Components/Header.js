import React, { useEffect } from "react";

import logo from "../assets/desktop/logo.svg";
import { NavLink } from "react-router-dom";
import sun from "./../assets/desktop/icon-sun.svg";
import moon from "./../assets/desktop/icon-moon.svg";
import LogoutButton from "./buttons/LogoutButton";

export default function Header(props) {
  const { handleThemeChange, theme, loggedIn, onLogout } = props;

  const changeTheme = () => {
    const themeCheckbox = document.getElementById("themeCheckbox");
    if (theme === "light") {
      themeCheckbox.checked = true;
      handleThemeChange("dark");
    } else {
      themeCheckbox.checked = false;
      handleThemeChange("light");
    }
  };

  useEffect(() => {
    const themeCheckbox = document.getElementById("themeCheckbox");
    if (theme === "light") {
      themeCheckbox.checked = false;
    } else {
      themeCheckbox.checked = true;
    }
  }, []);

  return (
    <div className="header outside-container">
      {/*add the class of */}
      <div className="inner-container navbar-expand-md  navbar navbar-light ">
        <NavLink to="/" className="logo navbar-brand ">
          <img src={logo} alt="" />
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* navbar-content here */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
          {loggedIn && 
          <li className = "nav-item">
          <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </li> }
            {loggedIn && <LogoutButton className="nav-link" onLogout={onLogout}></LogoutButton>}
            {!loggedIn && (
              <NavLink to="/signup/employee" className="nav-link ">
                New Jobseeker
              </NavLink>
            )}
            {!loggedIn && (
              <NavLink to="/signup/employer" className="nav-link ">
                New Buisness
              </NavLink>
            )}

            {!loggedIn && (
              <NavLink to="/login" className="nav-link ">
                Login
              </NavLink>
            )}
          </ul>

          <div className=" my-2 my-lg-0 main-switch">
            <div className="sun icon">
              <img src={sun} alt="" />
            </div>
            <label class="switch">
              <input onChange={changeTheme} id="themeCheckbox" type="checkbox"></input>
              <span class="slider round"></span>
            </label>
            <div className="moon icon">
              <img src={moon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
