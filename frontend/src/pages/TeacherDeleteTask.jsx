import React, { useState } from "react";
import BackButton from "../components/BackButton/BackButton";
import Loading from "../components/Loading";
import Navbar from "../components/NavBar/Navbar";
import axios from "axios";
import NewNavbar from "../components/NavBar/NewNavbar";
import { useNavigate, useParams } from "react-router-dom";

const DeleteTask = () => {
  const viteURL = import.meta.env.VITE_URL;

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("auth-token");
  const config = {
    headers: {
      "auth-token": token,
    },
  };

  const handleDeleteTask = () => {
    setLoading(true);
    axios
      .delete(`${viteURL}/tasks/${id}`, config)
      .then(() => {
        setLoading(false);
        navigate("/Teachers/TeacherTaskHome");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occured. Please check the console");
        console.log(error);
      });
  };

  return (
    <div className="app">
      <NewNavbar />

      <div className="content deleteJornalPage">
        <div className="backbutton">
          <BackButton destination="/Teachers/TeacherTaskHome" />
          <h1>Delete task</h1>
        </div>
        {loading ? <Loading /> : ""}
     

      <div className="areYouSure">
        <h3>Are you sure you want to delete this task?</h3>
        <button onClick={handleDeleteTask}>Yes, delete</button>
      </div>
      </div>
    </div>
  );
};

export default DeleteTask;
