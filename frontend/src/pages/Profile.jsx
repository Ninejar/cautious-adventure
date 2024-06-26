import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";
import NewNavbar from "../components/NavBar/NewNavbar";
import BackButton from "../components/BackButton/BackButton";
import { jwtDecode } from "jwt-decode";
import "../components/Profile/Profile.css";
import certificatePDF from '../../public/img/certificate.pdf';

const Profile = () => {
    const viteURL = import.meta.env.VITE_URL;

    const [journals, setJournals] = useState([]);
    const [fname, setfName] = useState('')
    const [lname, setlName] = useState('')
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("auth-token"); // Retrieve token from local storage
    const config = {
      headers: {
        "auth-token": token, // Set the token in the request headers
      },
    };
        axios
            .get(`${viteURL}/journals`, config)
            .then((res) => {
                setJournals(res.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });


    if (token) {
      const decoded = jwtDecode(token);
      setfName(decoded.fName);
      setlName(decoded.lName);
      setLoading(false);
      console.log(decoded);
    } else {
      // Handle case where token is not present
      setLoading(false);
    }
  }, []);

  const totalAchievementsUnlocked = () => {
    const achievements = [
      journals.length >= 1,
      journals.length >= 5,
      journals.length >= 10,
      journals.length >= 15,
      journals.length >= 20,
      journals.length >= 25,
      journals.length >= 30,
      journals.length >= 35,
    ];
    const unlockedCount = achievements.filter(
      (achievement) => achievement
    ).length;
    return unlockedCount;
  };

  const getAchievementTime = (entriesNeeded) => {
    if (journals.length >= entriesNeeded) {
      const unlockedAchievement = journals[entriesNeeded - 1]; // Get the entry at the required index
      const createdAt = new Date(unlockedAchievement.createdAt);

      // Format the date components
      const day = createdAt.getDate();
      const month = createdAt.toLocaleString("default", { month: "short" });
      const year = createdAt.getFullYear();
      const hours = createdAt.getHours();
      const minutes = createdAt.getMinutes();

      // Format the time component
      const time = `${hours < 10 ? "0" : ""}${hours}:${
        minutes < 10 ? "0" : ""
      }${minutes}`;

      // Construct the formatted timestamp
      return `${day} ${month}, ${year} @ ${time}`;
    }
    return null;
  };

  return (
    <div className="app">
      <NewNavbar />
      <div className="content">
        <div className="backbutton">
          <BackButton destination="/journals" /> <h1>Profile</h1>
        </div>

        <div className="profile_user">
          <img
            src="../public/img/profile_user.png"
            alt="1 journal entries achievement"
          />
          <p className="profile_user_username">
            {fname} {lname}
          </p>
          <div className="stats">
            <div>
              <span>{journals.length}</span> <p>Total journal entries</p>
            </div>
            <div>
              <span>{totalAchievementsUnlocked()} / 8</span>{" "}
              <p>Achievements unlocked</p>
            </div>
          </div>
        </div>

        <div className="achievements_container">
          <h2>Personal Achievements</h2>
          <figure>
            {journals.length >= 1 ? (
              <>
                <img
                  src="../public/img/achievement_1.png"
                  alt="1 journal entries achievement"
                />
                <div className="figcaption_container">
                  <figcaption>You have written 1 journal</figcaption>
                  <figcaption>Unlocked at {getAchievementTime(1)}</figcaption>
                </div>
              </>
            ) : (
              <>
                <img src="../public/img/locked.png" alt="locked" />
                <figcaption>You need to write 1 journal to unlock this</figcaption>
              </>
            )}
          </figure>
          <figure>
            {journals.length >= 5 ? (
              <>
                <img src="../public/img/achievement_5.png" alt="placeholder" />
                <div className="figcaption_container">
                  <figcaption>You have written 5 journals</figcaption>
                  <figcaption>Unlocked at {getAchievementTime(5)}</figcaption>
                </div>
              </>
            ) : (
              <>
                <img src="../public/img/locked.png" alt="locked" />
                <figcaption>You need to write 5 journals to unlock this</figcaption>
              </>
            )}
          </figure>
          <figure>
            {journals.length >= 10 ? (
              <>
                <img src="../public/img/achievement_10.png" alt="placeholder" />
                <div className="figcaption_container">
                  <figcaption>You have written 10 journals</figcaption>
                  <figcaption>Unlocked at {getAchievementTime(10)}</figcaption>
                </div>
              </>
            ) : (
              <>
                <img src="../public/img/locked.png" alt="locked" />
                <figcaption>You need to write 10 journals to unlock this</figcaption>
              </>
            )}
          </figure>
          <figure>
            {journals.length >= 15 ? (
              <>
                <img src="../public/img/achievement_15.png" alt="placeholder" />
                <div className="figcaption_container">
                  <figcaption>You have written 15 journals</figcaption>
                  <figcaption>Unlocked at {getAchievementTime(15)}</figcaption>
                </div>
              </>
            ) : (
              <>
                <img src="../public/img/locked.png" alt="locked" />
                <figcaption>You need to write 15 journals to unlock this</figcaption>
              </>
            )}
          </figure>
          <figure>
            {journals.length >= 20 ? (
              <>
                <img src="../public/img/achievement_20.png" alt="placeholder" />
                <div className="figcaption_container">
                  <figcaption>You have written 20 journals</figcaption>
                  <figcaption>Unlocked at {getAchievementTime(20)}</figcaption>
                </div>
              </>
            ) : (
              <>
                <img src="../public/img/locked.png" alt="locked" />
                <figcaption>You need to write 20 journals to unlock this</figcaption>
              </>
            )}
          </figure>
          <figure>
            {journals.length >= 25 ? (
              <>
                <img src="../public/img/achievement_25.png" alt="placeholder" />
                <div className="figcaption_container">
                  <figcaption>You have written 25 journals</figcaption>
                  <figcaption>Unlocked at {getAchievementTime(25)}</figcaption>
                </div>
              </>
            ) : (
              <>
                <img src="../public/img/locked.png" alt="locked" />
                <figcaption>You need to write 25 journals to unlock this</figcaption>
              </>
            )}
          </figure>
          <figure>
            {journals.length >= 30 ? (
              <>
                <img src="../public/img/achievement_30.png" alt="placeholder" />
                <div className="figcaption_container">
                  <figcaption>You have written 30 journals</figcaption>
                  <figcaption>Unlocked at {getAchievementTime(30)}</figcaption>
                </div>
              </>
            ) : (
              <>
                <img src="../public/img/locked.png" alt="locked" />
                <figcaption>You need to write 30 journals to unlock this</figcaption>
              </>
            )}
          </figure>

          <figure className="certificate">
            {journals.length >= 35 ? (
              <>
                <img
                  src="../public/img/achievement_certificate.png"
                  alt="placeholder"
                />
                <div className="figcaption_container">
                  <figcaption>
                    You have written 35 journals and unlocked the certificate!
                    <br />
                    <a target="_blank" href="/img/certificate.pdf?url">
                      Download it here
                    </a>
                  </figcaption>
                  <figcaption>Unlocked at {getAchievementTime(30)}</figcaption>
                </div>
              </>
            ) : (
              <>
                <img src="../public/img/locked.png" alt="locked" />
                <figcaption>
                You need to write 35 journals to unlock this
                </figcaption>
              </>
            )}
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Profile;
