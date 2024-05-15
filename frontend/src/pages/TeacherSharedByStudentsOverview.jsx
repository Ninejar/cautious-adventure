import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar/Navbar";
import NewNavbar from "../components/NavBar/NewNavbar";
import axios from "axios";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton/BackButton";
import "../components/StudentTasks/StudentTasks.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const TeacherSharedByStudentsOverview = () => {
  const viteURL = import.meta.env.VITE_URL;

  const [studentSharedJournals, setStudentSharedJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate()

  const token = localStorage.getItem("auth-token");
  const config = {
    headers: {
      "auth-token": token,
    },
  };

  const decoded = jwtDecode(token);
  const user_id = decoded._id;

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${viteURL}/tasks/published/`, config)
      .then((res) => {
        // Filter tasks with visibility "Publish" and createdBy matching current user ID
        const publishedTasks = res.data.data.filter(
          (task) => task.visibility === "Publish" && task.createdBy === user_id
        );

        // Set the state with filtered tasks
        setStudentSharedJournals(publishedTasks);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleClickTask = (studentSharedJournal) => {
    navigate(`${studentSharedJournal._id}`);
    console.log("huh")
  };

  return (
    <div className="app">
      <NewNavbar />
      <div className="content">
        <div className="backbutton">
          <BackButton destination="/teachers" /> <h1>Shared</h1>
        </div>
        <div className="student_tasks_container">
          <h1>My published tasks</h1><span>Click on a task to see student submissions</span>
          {studentSharedJournals.map((studentSharedJournal) => (
            <div
              className="student_tasks_wrapper"
              key={studentSharedJournal._id}
              onClick={() => handleClickTask(studentSharedJournal)}
            >
              <div className="student_tasks">
                <h2>{studentSharedJournal.title}</h2>
                <p>{studentSharedJournal.shortDesc}</p>
                <p></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TeacherSharedByStudentsOverview;
