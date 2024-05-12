import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Page from "../DocumentPage/DocumentPage";
import { useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import Loading from "../Loading";
import { jwtDecode } from "jwt-decode";

const Create = ({taskId,onDone}) => {
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

    axios
      .get(`http://localhost:1814/users/${userId}/interestedTasks`, config)
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
    formData.append("taskId", taskId);
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
      .post("http://localhost:1814/journals", formData, config)
      .then(() => {
        setLoading(false);
        onDone();
        
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  };

  return (

  

        <div className="create_journal create">
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
              <label htmlFor="public">Share with others</label>
            </div>
          </div>
          <button onClick={handleSaveJournal}>Post</button>
        </div>
      
  );
};

export default Create;
