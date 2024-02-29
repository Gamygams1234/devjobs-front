import React, { useState, useEffect } from "react";
import { useNavigate, Redirect, Route, useLocation } from "react-router-dom";

export default function Login(props) {
  const { onLogin } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const location = useLocation();
  const url = process.env.REACT_APP_SERVER;


  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}/accounts/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      onLogin();
      navigate("/");
    } else {
      setError(data.message);
    }
  };

  useEffect(() => {
    if (location.state !== null) {
      setError(location.state.error);
    } else {
      setError("");
    }
  }, []);

  const showError = () => (
    <div className="alert alert-danger mb-2" style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  return (
    <div className="outside-container">
      <div className="inner-container pt-2">
        {showError()}

        <h1 className="fw-600 text-black mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label for="email" className="text-black fw-800 mb-3">
              Email
            </label>
            <input className="form-control" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
          </div>
          <div className="form-group">
            <label for="password" className="text-black fw-800 mb-3">
              Password
            </label>
            <input className="form-control" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
          </div>
          <button type="submit" className="btn btn-1">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
