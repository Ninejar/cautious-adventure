import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Loading from "../components/Loading";
import BackButton from "../components/BackButton/BackButton";
import Navbar from "../components/NavBar/Navbar";
import NewNavbar from "../components/NavBar/NewNavbar";
import TasksCard from "../components/TasksHome/tasksCard";

const TeacherHome = () => {
  const viteURL = import.meta.env.VITE_URL;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("newest"); // Default sorting type
  const [filterType, setFilterType] = useState("all"); 

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
        console.log(res.data.data);
        let sortedJournals = [...res.data.data];
        if (sortType === "newest") {
          sortedJournals.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
        } else if (sortType === "oldest") {
          sortedJournals.sort(
            (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
          );
        }
        if (filterType !== "all") {
          sortedJournals = sortedJournals.filter(
            (item) => item.visibility === filterType
          );
        }
        setTasks(sortedJournals);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [sortType, filterType]);

  const handleSortChange = (type) => {
    setSortType(type);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  return (
    <div className="app">
      <NewNavbar />
      <div className="content">
        <div className="backbutton">
          <BackButton destination="/teachers" />
          <h1>Your tasks list</h1>
        </div>

        <div className="sorting_filters teacherTaskHome">
          <p>Sort by:</p>
          <select
            value={sortType}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Draft">Draft</option>
            <option value="Publish">Published</option>
          </select>
        </div>

        {loading ? <Loading /> : <TasksCard tasks={tasks} />}
      </div>
    </div>
  );
};

export default TeacherHome;
