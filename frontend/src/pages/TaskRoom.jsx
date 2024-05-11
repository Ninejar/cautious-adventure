import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar/Navbar";
import axios from "axios";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton/BackButton";
import "../components/StudentTasks/StudentTasks.css";

const Task = () => {
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array
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
      .get(`http://localhost:1814/tasks/published/${id}`, config)
      .then((res) => {
        setTasks(res.data.data);
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
      <div className="backbutton"><BackButton destination='/journals' /> <h1>Tasks</h1></div>
        <div className="student_tasks_container">
          <h1>Available tasks</h1>
          {tasks.map((task) => (
            <div className="student_tasks_wrapper" key={task._id}>
              <div className="student_tasks">
                <h2>{task.title}</h2> {/* Assuming task has a title */}
                <p>{task.content}</p> {/* Assuming task has a description */}
              </div>
              <div className="interested">
                <p>Interested?</p>
                <div className="checkbox-wrapper-34">
                  <input
                    className="tgl tgl-ios"
                    id={`toggle-${task._id}`}
                    type="checkbox"
                  />
                  <label className="tgl-btn" htmlFor={`toggle-${task._id}`}></label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Task;
