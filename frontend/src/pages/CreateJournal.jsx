import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton/BackButton";
import Loading from "../components/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";
import NewNavbar from "../components/NavBar/NewNavbar";
import Page from "../components/DocumentPage/DocumentPage";
import { useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { jwtDecode } from "jwt-decode";
import "../components/DocumentPage/sheets-of-paper.css";
import "../components/DocumentPage/sheets-of-paper-a4.css";
import { useToast } from "../context/toastContext"; 

const CreateJournal = () => {
  const viteURL = import.meta.env.VITE_URL;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [visibility, setVisibility] = useState("");
  const [interestedTasks, setInterestedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");
  const { userId } = useParams();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    const config = {
      headers: {
        "auth-token": token,
      },
    };
    const decoded = jwtDecode(token);
    const userId = decoded._id;
    console.log(token)

    axios
      .get(`${viteURL}/users/${userId}/interestedTasks`, config)
      .then((res) => {
        const interestedTaskIds = res.data.interestedTasks;
        setInterestedTasks(interestedTaskIds);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSaveJournal = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("visibility", visibility);
    formData.append("taskId", selectedTask);
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
    setLoading(true);
    const token = localStorage.getItem("auth-token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "auth-token": token,
      },
    };
    axios
      .post(`${viteURL}/journals`, formData, config)
      .then(() => {
        setLoading(false);
        localStorage.setItem("toastMessage", "Journal created successfully!");
        navigate("/journals/list");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  };

  return (
    <div className="app">
      <NewNavbar />
      <div className="content">
        <div className="backbutton">
          <BackButton destination="/journals/list" />
          <h1>Create journal</h1>
        </div>

        {loading ? <Loading /> : ""}

        <div className="create_journal_container">
          <div className="create_journal">
            <input
              id="title"
              type="text"
              placeholder="Untitled"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Page
              data-testid="document-page"
              content={content}
              onChange={(value) => setContent(value)}
            />

            <div className="attachFile_container">
              <input type="file" multiple onChange={handleFileChange} />
            </div>

            <div className="radio_container">
              <label>Set visibility</label>
              <div>
                <input
                  type="radio"
                  id="private"
                  value="Private"
                  checked={visibility === "Private"}
                  onChange={(e) => setVisibility(e.target.value)}
                />
                <label htmlFor="private">Keep private</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="public"
                  value="Public"
                  checked={visibility === "Public"}
                  onChange={(e) => setVisibility(e.target.value)}
                />
                <label htmlFor="public">Share with teacher</label>
              </div>
            </div>

            <select
              name="taskId"
              onChange={(e) => setSelectedTask(e.target.value)}
            >
              <option value="">Select a task</option>
              {interestedTasks.map((task) => (
                <option key={task._id} value={task._id}>
                  {task.title}
                </option>
              ))}
            </select>

            <button onClick={handleSaveJournal}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJournal;
