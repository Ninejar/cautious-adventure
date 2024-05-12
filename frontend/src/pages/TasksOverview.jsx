import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";
import axios from "axios";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton/BackButton";
import "../components/StudentTasks/StudentTasks.css";
import { jwtDecode } from "jwt-decode";

const TasksOverview = () => {
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [sortType, setSortType] = useState("newest"); // Default sorting type
  const [filterType, setFilterType] = useState("all");

  const navigate = useNavigate();

  const token = localStorage.getItem("auth-token");
  const config = {
    headers: {
      "auth-token": token,
    },
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("auth-token");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken._id;

        const userResponse = await axios.get(
          `http://localhost:1814/users/${userId}`,
          config
        );
        const userData = userResponse.data;
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:1814/tasks/published`, config)
      .then((res) => {
        let sortedTasks = [...res.data.data];
        if (sortType === "newest") {
          sortedTasks.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
        } else if (sortType === "oldest") {
          sortedTasks.sort(
            (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
          );
        }
        if (filterType !== "all") {
          if (filterType === "interested") {
            sortedTasks = sortedTasks.filter(
              (item) => user && user[0].interestedTasks.includes(item._id)
            );
          } else {
            sortedTasks = sortedTasks.filter(
              (item) => item.visibility === filterType
            );
          }
        }
        setTasks(sortedTasks);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [sortType, filterType, user]);

  const handleClickTask = (task) => {
    navigate(`task/${task._id}`);
  };

  const handleInterestedClick = async (taskId) => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const userResponse = await axios.get(
        `http://localhost:1814/users/${userId}`,
        config
      );
      const user = userResponse.data;

      // Check if the task is already in the user's interested tasks
      const isInterested = user[0].interestedTasks.includes(taskId);

      if (isInterested) {
        // If already interested, remove it
        await axios.delete(
          `http://localhost:1814/users/${userId}/interestedTasks/${taskId}`,
          config
        );
      } else {
        // If not interested, add it
        await axios.put(
          `http://localhost:1814/users/${userId}/interestedTasks/${taskId}`,
          null,
          config
        );
      }

      const updatedUserResponse = await axios.get(
        `http://localhost:1814/users/${userId}`,
        config
      );
      const updatedUser = updatedUserResponse.data;
      setUser(updatedUser);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortChange = (value) => {
    setSortType(value);
  };

  const handleFilterChange = (value) => {
    setFilterType(value);
  };

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <div className="backbutton">
          <BackButton destination="/journals" /> <h1>Tasks</h1>
        </div>

        <div className="sorting_filters">
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
            <option value="interested">Interested</option>
          </select>
        </div>
        <div className="student_tasks_container">
          <h1>Available tasks</h1>
          {tasks.map((task) => (
            <>
              <div className="student_tasks_wrapper" key={task._id}>
                <div
                  className="student_tasks"
                  onClick={() => handleClickTask(task)}
                >
                  <div>
                    <h2>{task.title}</h2> {/* Assuming task has a title */}
                    <div>{task.shortDesc}</div>
                  </div>

                  <div className="lastUpd">
                     <span>Last updated: {new Date(task.updatedAt).toLocaleString()}</span> 
                  </div>
                </div>
                <div className="interested">
                  <p>Interested?</p>
                  <div className="checkbox-wrapper-34">
                    <input
                      className="tgl tgl-ios"
                      id={`toggle-${task._id}`}
                      type="checkbox"
                      onChange={() => handleInterestedClick(task._id)}
                      checked={
                        user && user[0].interestedTasks.includes(task._id)
                      }
                    />
                    <label
                      className="tgl-btn"
                      htmlFor={`toggle-${task._id}`}
                    ></label>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TasksOverview;
