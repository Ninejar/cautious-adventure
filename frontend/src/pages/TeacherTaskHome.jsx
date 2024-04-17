import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Loading from "../components/Loading";
import BackButton from "../components/BackButton/BackButton";
import Navbar from "../components/NavBar/Navbar";

const TeacherTaskHome = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('auth-token');
    const config = {
      headers: {
        'auth-token': token
      }
    };
    axios
      .get("http://localhost:1814/tasks", config)
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
        <div className="backbutton">
        <BackButton destination='/teachers' />
          <h1>Task List</h1>
        </div>

        <div className="create_button">
          <Link to="/teachers/TeacherCreateTask">
            <MdOutlineAddBox /> Create New Task
          </Link>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div>
            <h2>Your Tasks</h2>
            {tasks.length === 0 ? (
              <p>No tasks created yet.</p>
            ) : (
              <ul>
                {tasks.map((task) => (
                  <li key={task._id}>
                    <Link to={`/tasks/${task._id}`}>{task.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherTaskHome;
