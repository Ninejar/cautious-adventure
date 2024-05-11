import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar/Navbar";
import axios from "axios";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton/BackButton";
import "../components/StudentTasks/StudentTasks.css";

const TeacherSharedByStudents = () => {
  const [studentSharedJournals, setStudentSharedJournals] = useState([]); // Initialize tasks as an empty array
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const token = localStorage.getItem("auth-token");
  const config = {
    headers: {
      "auth-token": token,
    },
  };

  useEffect(() => {
    setLoading(true);
  
    axios
      .get(`http://localhost:1814/tasks/`, config)
      .then((res) => {
        // Filter tasks with visibility "Publish"
        const publishedTasks = res.data.data.filter(task => task.visibility === "Publish");
  
        // Set the state with filtered tasks
        setStudentSharedJournals(publishedTasks);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <div className="backbutton">
          <BackButton destination="/teachers" /> <h1>Tasks</h1>
        </div>
        <div className="student_tasks_container">
          <h1>her ska Student-shared tasks visas</h1>
          {studentSharedJournals.map((studentSharedJournal) => (
            <div className="student_tasks_wrapper">
              <div className="student_tasks">
                <h2>{studentSharedJournal.title}</h2>
                <h2>{studentSharedJournal.content}</h2>
                <p></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TeacherSharedByStudents;
