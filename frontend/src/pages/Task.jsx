import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar/Navbar";
import axios from "axios";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton/BackButton";
import { jwtDecode } from "jwt-decode";
import "../components/StudentTasks/StudentTasks.css";
import { FaRegEyeSlash } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import Create from "../components/Create/Create";
import { IoCloseOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Task = () => {
  const [task, setTask] = useState({});
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [uniqueAttachments, setUniqueAttachments] = useState([]);
  const [user, setUser] = useState(null);
  const [openTaskEntry, setOpenTaskEntry] = useState(false);
  const [selectedTaskEntry, setSelectedTaskEntry] = useState(null);
  const [openPostEntry, setOpenPostEntry] = useState(null);
  const [slidePosition, setSlidePosition] = useState(-470);
  const [createdByUsername, setCreatedByUsername] = useState(""); // Step 1

  const token = localStorage.getItem("auth-token");

  const currentUserID = jwtDecode(token);

  const config = {
    headers: {
      "auth-token": token,
    },
  };

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

  const fetchUserNameById = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:1814/users/${userId}`,
        config
      );
      const fName = response.data[0].fName;
      const lName = response.data[0].lName;
      const fullName = `${fName} ${lName}`;
      return fullName;
    } catch (error) {
      console.error("Error fetching user:", error);
      return ""; // Return empty string if user not found
    }
  };
  useEffect(() => {
    setLoading(true);

    // Fetch the task details
    axios
  .get(`http://localhost:1814/tasks/published/${id}`, config)
  .then(async (res) => {
    setTask(res.data.task);
    setLoading(false);
    console.log(res.data.task.createdBy)

    // Fetch the username based on createdBy ID
    axios
      .get(`http://localhost:1814/users/${res.data.task.createdBy}`) // Update to use res.data.task.createdBy
      .then((userRes) => {
        const createdByUsername = userRes.data[0].fName;
        setCreatedByUsername(createdByUsername);
        console.log(createdByUsername)
      })
      .catch((userError) => {
        console.log("Error fetching user:", userError);
      });

        const uniqueUrls = Array.isArray(res.data.task.fileURL)
          ? Array.from(new Set(res.data.task.fileURL))
          : [];
        setUniqueAttachments(uniqueUrls);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    // Fetch all journals related to the task
    axios
      .get(`http://localhost:1814/journals/shared`, config)
      .then((res) => {
        // Filter journals by taskId
        const filteredJournals = res.data.data.filter(
          (journal) => journal.taskId === id
        );
        setJournals(filteredJournals);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderAttachment = () => {
    if (uniqueAttachments.length > 0) {
      return uniqueAttachments.map((url, index) => {
        const fileExtension = url.split(".").pop().toLowerCase();
        if (fileExtension === "pdf") {
          return (
            <div key={index}>
              <a
                className="file"
                href={`http://localhost:1814/${url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Attachment
              </a>
            </div>
          );
        } else if (
          fileExtension === "jpg" ||
          fileExtension === "jpeg" ||
          fileExtension === "png" ||
          fileExtension === "gif"
        ) {
          return (
            <div key={index}>
              <img
                className="file"
                src={`http://localhost:1814/${url}`}
                alt="Attachment"
              />
            </div>
          );
        } else {
          return (
            <div key={index}>
              <a
                className="file"
                href={`http://localhost:1814/${url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Attachment
              </a>
            </div>
          );
        }
      });
    } else {
      return <span>No attachments</span>;
    }
  };

  const renderTaskAttachment = (fileURL) => {
    if (fileURL.length > 0) {
      return fileURL.map((url, index) => {
        const fileExtension = url.split(".").pop().toLowerCase();
        if (fileExtension === "pdf") {
          return (
            <div key={index}>
              <a
                className="file"
                href={`http://localhost:1814/${url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Attachment
              </a>
            </div>
          );
        } else if (
          fileExtension === "jpg" ||
          fileExtension === "jpeg" ||
          fileExtension === "png" ||
          fileExtension === "gif"
        ) {
          return (
            <div key={index}>
              <img
                className="file"
                src={`http://localhost:1814/${url}`}
                alt="Attachment"
              />
            </div>
          );
        } else {
          return (
            <div key={index}>
              <a
                className="file"
                href={`http://localhost:1814/${url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Attachment
              </a>
            </div>
          );
        }
      });
    } else {
      return <span>No attachments</span>;
    }
  };

  const handleCloseModal = () => {
    setOpenTaskEntry(false);
    console.log("closed");
  };

  const handleClickTaskEntry = (journal) => {
    setOpenTaskEntry(true);
    setSelectedTaskEntry(journal);
  };

  const handleClickPostEntry = () => {
    setOpenPostEntry(true);
  };

  const handleDone = async () => {
    setOpenPostEntry(false);
    const res = await axios.get(
      `http://localhost:1814/journals/shared`,
      config
    );
    const updatedJournals = res.data.data.filter(
      (journal) => journal.taskId === id
    );
    setJournals(updatedJournals);
    handleInterestedClick(task._id);
  };

  const renderJournals = () => {
    // Function to render journals
    if (journals.length > 0) {
      const currentUserJournals = journals.filter(
        (journal) => journal.createdBy === currentUserID._id
      );

      if (currentUserJournals.length > 0) {
        return journals.map((journal) => (
          <div>
            <p className="createdBy">Entry by {createdByUsername}</p>
            <div
              key={journal._id}
              className="taskEntry"
              onClick={() => handleClickTaskEntry(journal)}
            >
              <div>
                <h3>{journal.title}</h3>
                <div className="taskEntryDesc">
                  <div
                    className="truncate"
                    dangerouslySetInnerHTML={{ __html: journal.content }}
                  />

                  <div></div>
                </div>
              </div>

              <div className="file_uploads_container taskPage renderTaskAttachment smaller">
                {renderTaskAttachment(journal.fileURL)}
              </div>
            </div>
          </div>
        ));
      } else {
        // Render all journals with blur
        return (
          <>
            {journals.map((journal) => (
              <div>
                <p className="createdBy">Entry by {createdByUsername}</p>
                <div className="sharpEdge">
                  <div
                    key={journal._id}
                    className="taskEntry blurred"
                    onClick={() => handleClickTaskEntry(journal)}
                  >
                    <div>
                      <h3>{journal.title}</h3>
                      <div className="taskEntryDesc">
                        <div
                          className="truncate"
                          dangerouslySetInnerHTML={{ __html: journal.content }}
                        />

                        <div></div>
                      </div>
                    </div>

                    <div className="file_uploads_container taskPage renderTaskAttachment smaller">
                      {renderTaskAttachment(journal.fileURL)}
                    </div>
                  </div>
                </div>
                <div className="postToSee">
                  <FaRegEyeSlash size={50} />
                  <span>Post to view</span>
                  <span>To view other's entries, share yours with them.</span>
                </div>
              </div>
            ))}
          </>
        );
      }
    } else {
      // Render message when no journals are available
      return (
        <div>
          <p>-</p>
          <div className="sharpEdge">
            <div className="taskEntry"></div>
          </div>

          <div className="postToSee">
            <span>No one has posted an entry to this task, yet.</span>
          </div>
        </div>
      );
    }
  };

  const handleInterestedClick = async (taskId) => {
    try {
      const token = localStorage.getItem("auth-token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const userResponse = await axios.get(
        `http://localhost:1814/users/${userId}`,
        config
      );
      const user = userResponse.data;

      console.log(user);
      console.log(taskId);

      // Check if the task is already in the user's interested tasks
      const isInterested = user[0].interestedTasks.includes(taskId);
      console.log(isInterested);

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

  const handleClickSlide = () => {
    const elToSlide = document.querySelector(
      ".modal.create .taskDescriptionContainer"
    );
    const newPosition = slidePosition === 0 ? -470 : 0;
    elToSlide.style.right = `${newPosition}px`;
    setSlidePosition(newPosition);
  };

  const handleClickCloseMdal = () => {
    setOpenPostEntry(false);
  };

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <div className="backbutton">
          <BackButton destination="/tasksOverview" />{" "}
          <h1>Tasks / "{task.title}"</h1>
        </div>

        {openPostEntry && (
          <div className="modal create">
            <div class="container">
              <div class="Task">
                <div className="taskDescriptionContainer">
                  <div
                    className="taskSlideInButton"
                    onClick={() => handleClickSlide()}
                  >
                    {" "}
                    {slidePosition == 0 ? (
                      <FaArrowRight
                        className="FaArrowRight"
                        size={30}
                        color="black"
                      />
                    ) : (
                      <>
                        <FaArrowLeft
                          className="FaArrowLeft"
                          size={30}
                          color="black"
                        />
                      </>
                    )}
                  </div>
                  <div className="title">
                    <h2>{task.title}</h2>
                  </div>

                  <div className="description">
                    <div dangerouslySetInnerHTML={{ __html: task.content }} />
                  </div>

                  <div className="attachments">
                    <span>Attachments</span>
                    <div className="file_uploads_container taskPage">
                      {renderAttachment()}
                    </div>
                  </div>
                </div>
              </div>
              <div class="Create">
                <div className="createEntryWrapper">
                  <div className="createEntry">
                    <div
                      className="closeCreate"
                      onClick={() => handleClickCloseMdal()}
                    >
                      <div>
                        <IoCloseOutline size={60} color="white" />
                      </div>
                    </div>
                    <Create taskId={id} onDone={() => handleDone()} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTaskEntry && openTaskEntry ? (
          <>
            <div className="modal postEntry">
              <div className="closeCreate" onClick={() => handleCloseModal()}>
                <div>
                  <IoCloseOutline size={60} color="white" />
                </div>
              </div>
              <div className="openTaskEntryContainer">
                <div>
                  <div>
                    <p>Entry by: {selectedTaskEntry.createdBy}</p>
                  </div>
                  <div>
                    <h2>{selectedTaskEntry.title}</h2>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedTaskEntry.content,
                    }}
                  />
                </div>

                <div>
                  Attachments
                  <div className="file_uploads_container taskPage renderTaskAttachment">
                    {renderTaskAttachment(selectedTaskEntry.fileURL)}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <div className="taskRoom_wrapper">
          <div className="taskDescriptionContainer">
            <div className="interested">
              <div>Task by {createdByUsername}</div>
              <div className="interestedContent">
                <span>Interested?</span>

                <div className="checkbox-wrapper-34">
                  <input
                    className="tgl tgl-ios"
                    id={`toggle-${task._id}`}
                    type="checkbox"
                    onChange={() => handleInterestedClick(task._id)}
                    checked={user && user[0].interestedTasks.includes(task._id)}
                  />
                  <label
                    className="tgl-btn"
                    htmlFor={`toggle-${task._id}`}
                  ></label>
                </div>
              </div>
            </div>

            <div className="title">
              <h2>{task.title}</h2>
            </div>

            <div className="description">
              <div dangerouslySetInnerHTML={{ __html: task.content }} />
            </div>

            <div className="attachments">
              <span>Attachments</span>
              <div className="file_uploads_container taskPage">
                {renderAttachment()}
              </div>
            </div>
          </div>

          <div className="taskEntriesContainerWrapper">
            <div>
              <h2>All entries to this task</h2>
            </div>

            <div className="taskEntriesContainer">
              <div>
                {" "}
                -
                <div
                  className="taskEntry createNew"
                  onClick={() => handleClickPostEntry()}
                >
                  <GoPlus size={70} />
                  <div>Post entry</div>
                </div>
              </div>

              {renderJournals()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;