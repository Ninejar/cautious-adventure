import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Loading from "../components/Loading";
import BackButton from "../components/BackButton/BackButton";
import Navbar from "../components/NavBar/Navbar";
import TasksCard from "../components/TasksHome/tasksCard";

const TeacherHome = () => {
  const viteURL = import.meta.env.VITE_URL;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("auth-token");
    const config = {
      headers: {
        "auth-token": token,
      },
    };
    axios
      .get(`${viteURL}/tasks`, config)
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
        <div className="backbutton" ><BackButton destination="/teachers" /><h1>Your tasks list</h1></div>

        {loading ? <Loading /> : <TasksCard tasks={tasks} />}
      </div>
    </div>
  );
};

export default TeacherHome;
