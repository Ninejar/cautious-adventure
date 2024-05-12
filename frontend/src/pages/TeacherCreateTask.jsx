import React, { useState } from "react";
import BackButton from "../components/BackButton/BackButton";
import Loading from "../components/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";
import Page from "../components/DocumentPage/DocumentPage";
import "../components/DocumentPage/sheets-of-paper.css";
import "../components/DocumentPage/sheets-of-paper-a4.css";
import "../components/TasksHome/tasksCard.css";

const TeacherCreateTask = () => {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [visibility, setVisibility] = useState("Draft"); // Default visibility
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFiles(e.target.files); // Set the file object
  };

  const handleSaveTask = () => {
    const formData = new FormData(); // Create FormData object for file upload
    formData.append("title", title);
    formData.append("shortDesc", shortDesc);
    formData.append("content", content);
    formData.append("visibility", visibility); // Add visibility to form data
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]); // Append each file to FormData
    }
    setLoading(true);
    const token = localStorage.getItem("auth-token"); // Retrieve token from local storage
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "auth-token": token, // Set the token in the request headers
      },
    };
    axios
      .post("http://localhost:1814/tasks", formData, config) // Assuming the endpoint is different for tasks
      .then(() => {
        setLoading(false);
        navigate("/teachers/TeacherTaskHome"); // Redirect to tasks list after successful save
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  };

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <div className="backbutton">
          <BackButton destination="/teachers/TeacherTaskHome" />
          <h1>Create Task</h1>
        </div>

        {loading ? <Loading /> : ""}

        <div className="create_task">
          <input
            id="title"
            type="text"
            placeholder="Untitled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            id="shortDesc"
            type="text"
            placeholder="Short description of task..."
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
          ></input>
          <Page
            data-testid="document-page"
            content={content}
            onChange={(value) => setContent(value)}
          />
          <div className="attachFile_container">
            <input type="file" multiple onChange={handleFileChange} />
          </div>
          <div className="visibility_radios">
            <label>
              <input
                type="radio"
                value="Draft"
                checked={visibility === "Draft"}
                onChange={() => setVisibility("Draft")}
              />
              Draft
            </label>
            <label>
              <input
                type="radio"
                value="Publish"
                checked={visibility === "Publish"}
                onChange={() => setVisibility("Publish")}
              />
              Publish
            </label>
          </div>

          <button onClick={handleSaveTask}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default TeacherCreateTask;
