import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../Loader";

export default function Dashboard(props) {
  const { isLoggedIn } = props;
  const [dashboardUser, setDashboardUser] = useState(null);
  const [featuredUser, setFeaturedUser] = useState(null);
  const [error, setError] = useState("")
  const location = useLocation();
  const navigate = useNavigate();
  const url = process.env.REACT_APP_SERVER;

  useEffect(() => {
   const user  = jwtDecode(localStorage.getItem("token"));
   console.log(url)
   if (isLoggedIn){
    fetch(`${url}/accounts/users/${user.userId}`)
      .then((response) => response.json())
      .then((data) => {
        setDashboardUser(data);
        console.log(data);
      })
      .catch((err) => console.error(err));

      if(location.state != null){
        setError(location.state.error)
      }
    }else{
        navigate('/login',{state:{error:"Must login to access dashbooard"}});
    }
  }, []);

  const showError = () => (
    <div className="alert alert-danger mb-2" style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const userLinks = (
    <div className="card">
      <h4 className="card-header ">User Links</h4>
      <ul className="list-group ">
        <li className="list-group-item bg-white-1">
        {dashboardUser &&
          <Link className="nav-link" to={`/edit/user/${dashboardUser._id}/`}>
            Edit User
          </Link>
        }
        </li>
        <li className="list-group-item bg-white-1">
        {dashboardUser &&
          <Link className="nav-link" to={`/profile/${dashboardUser._id}/`}>
            View Profile
          </Link> }
        </li>
      </ul>
    </div>
  );
  const adminLinks = (
    <div className="card">
      <h4 className="card-header">Admin Links</h4>
      <ul className="list-group">
        <li className="list-group-item bg-white-1">
          <Link className="nav-link" to="/create/category">
            Create Category
          </Link>
        </li>
        <li className="list-group-item bg-white-1">
          <Link className="nav-link" to="/create/product">
            Create Product
          </Link>
        </li>
        <li className="list-group-item bg-white-1">
          <Link className="nav-link" to="/admin/orders">
            View Orders
          </Link>
        </li>
        <li className="list-group-item bg-white-1">
          <Link className="nav-link" to="/admin/products">
            Manage Products
          </Link>
        </li>
      </ul>
    </div>
  );

  if (!dashboardUser) {
    return (
      <div className="outside-container">
        <div className="inner-container pt-5 row justify-content-md-center ">
          <Loader />
        </div>
      </div>
    );
  } else {
    return (
      <div className="outside-container dashboard">
        <div className="inner-container pt-4 pb-4">
        {showError()}
          <div >
            <div className="jumbotron">
              <h1 className="display-4 fw-600 ">This is the Dashboard</h1>
              <p className="lead">Thanks for coming to my store to check out some of the products.</p>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-5 order-2">{dashboardUser.role === "admin" ? adminLinks : userLinks}</div>
              <div className="col-lg-9 col-md-7 order-1 order-md-3 ">
                <div className="card mb-5">
                  <h3 className="card-header ">User Information</h3>

                  <ul className="list-group bg-white-1 text-black">
                    {dashboardUser.role === "admin" ? (
                      <li className="list-group-item bg-white-1">Company Name: {dashboardUser.companyName}</li>
                    ) : (
                      <li className="list-group-item bg-white-1">
                        Name: {dashboardUser.firstName} {dashboardUser.lastName}{" "}
                      </li>
                    )}
                    {dashboardUser.email && <li className="list-group-item bg-white-1">Email: {dashboardUser.email}</li>}
                    {dashboardUser.phone && <li className="list-group-item bg-white-1">Phone: {dashboardUser.phone}</li>}
                    <li className="list-group-item bg-white-1">User Role: {dashboardUser.role === "admin" ? "Admin" : "Registered User"}</li>
                    {dashboardUser.portfolioWebsite && <li className="list-group-item bg-white-1">Portfolio: {dashboardUser.portfolioWebsite}</li>}
                    {dashboardUser.github && <li className="list-group-item bg-white-1">Github Username: {dashboardUser.github}</li>}
                    {dashboardUser.linkedIn && <li className="list-group-item bg-white-1">LinkedIn: {dashboardUser.linkedIn}</li>}
                    {dashboardUser.jobsApplied && <li className="list-group-item bg-white-1">Jobs Applied: {dashboardUser.jobsApplied.length}</li>}
                    {dashboardUser.headline && <li className="list-group-item bg-white-1">Headline: {dashboardUser.headline}</li>}
                    {dashboardUser.summary && <li className="list-group-item bg-white-1">Summary: {dashboardUser.summary}</li>}

                  </ul>
                </div>
              </div>
              {/*End of right Side */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
