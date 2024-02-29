import React from "react";

const LogoutButton = (props) => {
  const { onLogout, classNames } = props;
  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  return (
    <li className="nav-item">
      <div className="nav-link" onClick={handleLogout}>
        Logout
      </div>
    </li>
  );
};

export default LogoutButton;
