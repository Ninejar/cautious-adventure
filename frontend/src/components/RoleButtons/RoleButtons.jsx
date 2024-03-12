import React from "react";
import "./Rolebuttons.css";

const RoleButtons = () => {
  return (
    <div id="container">
      <form id="roleForm">
        <div className="radio" id="studentRadio">
          <input type="radio" id="student" name="role" value="student" />
          <label htmlFor="student" className="roleLabel">
            <img
              src="https://static.thenounproject.com/png/556113-200.png"
              alt="Student Icon"
              className="roleIcon"
            />
            <p className="roleText">Student</p>
          </label>
        </div>
        <div className="radio" id="teacherRadio">
          <input type="radio" id="teacher" name="role" value="teacher" />
          <label htmlFor="teacher" className="roleLabel">
            <img
              src="https://icons.veryicon.com/png/o/business/educational-administration-related/teacher-11.png"
              alt="Teacher Icon"
              className="roleIcon"
            />
            <p className="roleText">Teacher</p>
          </label>
        </div>
      </form>
    </div>
  );
};

export default RoleButtons;
