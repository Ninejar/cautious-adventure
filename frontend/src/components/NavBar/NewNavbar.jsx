import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NewNavbar = () => {
  const { userRole, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="welcome_nav">
      <ul className="logo">
        <li>
          <li>
            <a href="/">
              <img src="../../public/img/favicon.png" alt="" />
              <span>Sustainability Diary</span>
            </a>
          </li>
        </li>
      </ul>
      <ul className="logsig">
        {userRole === "student" ? (
          <>
            <li onClick={() => navigate("/journals/list")}>Journals</li>
            <li onClick={() => navigate("/tasksOverview")}>Tasks</li>
            <li onClick={() => navigate("/profile")}>Profile</li>
          </>
        ) : userRole === "teacher" ? (
          <>
            <li onClick={() => navigate("/teachers/TeacherTaskHome")}>Tasks</li>
            <li onClick={() => navigate("/teachers/shared")}>Shared</li>
          </>
        ) : ""}

        {userRole ? (
          <li onClick={handleLogout}>Logout</li>
        ) : (
          <>
            <li className="signin">
              <a href="/login">Sign in</a>
            </li>
            <li className="signup">
              <a href="/signup">Sign up</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NewNavbar;