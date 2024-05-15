import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import Navbar from "../components/NavBar/Navbar";
import NewNavbar from "../components/NavBar/NewNavbar";
import BackButton from "../components/BackButton/BackButton";
import Loading from "../components/Loading";
import Page from "../components/DocumentPage/DocumentPage";
import ConfirmationModal from "../components/ConfirmationModal/ConfirmationModal";
import "../components/DocumentPage/sheets-of-paper.css";
import "../components/DocumentPage/sheets-of-paper-a4.css";

const EditTask = () => {
  const viteURL = import.meta.env.VITE_URL;

  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attachmentToDelete, setAttachmentToDelete] = useState(null);
  const navigate = useNavigate();
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
      .get(`${viteURL}/tasks/${id}`, config)
      .then((res) => {
        setTitle(res.data.task.title);
        setShortDesc(res.data.task.shortDesc);
        setContent(res.data.task.content);
        setVisibility(res.data.task.visibility);
        setAttachments(Array.from(new Set(res.data.task.fileURL)));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console.");
        console.log(error);
      });
  }, []);

  const handleEditTask = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("shortDesc", shortDesc);
    formData.append("visibility", visibility);

    attachments.forEach((attachment) => {
      formData.append("file", attachment);
    });

    setLoading(true);
    axios
      .put(`${viteURL}/tasks/${id}`, formData, config)
      .then(() => {
        setLoading(false);
        navigate("/teachers/TeacherTaskHome");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  };

  const handleAttachmentsChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setAttachments((prevAttachments) => [...prevAttachments, ...selectedFiles]);
  };

  const handleRemoveAttachment = (indexToRemove) => {
    setAttachmentToDelete(indexToRemove);
    setIsModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setAttachmentToDelete(null);
  };

  const handleConfirmDelete = () => {
    const attachmentIndexToDelete = attachmentToDelete;
    setAttachments((prevAttachments) =>
      prevAttachments.filter((_, index) => index !== attachmentIndexToDelete)
    );

    setIsModalOpen(false);
    setAttachmentToDelete(null);
  };

  return (
    <div className="app">
      <NewNavbar />
      <div className="content">
        <div className="backbutton">
          <BackButton destination="/teachers/TeacherTaskHome" />
          <h1>Edit Task</h1>
        </div>

        {loading ? <Loading /> : ""}

        <div className="create_task">
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            id="shortDesc"
            type="text"
            placeholder="Short description of task..."
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
          />
          <Page content={content} onChange={(value) => setContent(value)} />
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
          <div className="attachFile_container">
            <input type="file" multiple onChange={handleAttachmentsChange} />
            {attachments.map((attachment, index) => (
              <div key={index}>
                <div className="attachFile_container">
                  <a
                    href={`${viteURL}/${attachment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="display_attachment_img_container">
                      File {index + 1}
                      <img
                        className="display_attachment_img"
                        src={`${viteURL}/${attachment}`}
                        alt={`Attachment ${index + 1}`}
                      />
                    </div>
                  </a>
                  <button
                    className="remove_attachment"
                    onClick={() => handleRemoveAttachment(index)}
                  >
                    <MdOutlineDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleEditTask}>Save</button>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        fileName={`File ${attachmentToDelete + 1}`}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default EditTask;
