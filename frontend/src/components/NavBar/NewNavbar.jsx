import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { HiLogout } from "react-icons/hi";

const NewNavbar = () => {
  const { userRole, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="welcome_nav">
      {userRole === "student" ? (
        <ul className="logo">
          <li onClick={() => navigate("/journals")}>
            <img src="../../public/img/favicon.png" alt="" />
            <span>Sustainability Diary</span>
          </li>
        </ul>
      ) : userRole === "teacher" ? (
        <ul className="logo">
          <li onClick={() => navigate("/teachers")}>
            <img src="../../public/img/favicon.png" alt="" />
            <span>Sustainability Diary</span>
          </li>
        </ul>
      ) : (
        <ul className="logo">
          <li onClick={() => navigate("/")}>
            <img src="../../public/img/favicon.png" alt="" />
            <span>Sustainability Diary</span>
          </li>
        </ul>
      )}

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
        ) : (
          ""
        )}

        {userRole ? (
          <>
            <li>|</li>
            <li className="logout" onClick={handleLogout}>Logout <HiLogout color="white" /></li>
          </>
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
