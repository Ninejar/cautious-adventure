import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { toggleSubMenu } from "./testjsfile"; // Adjust the path accordingly
import "./navBarStyle.css";

const Navbar = () => {
  // State to manage submenu visibility
  const [subMenuVisible, setSubMenuVisible] = useState({
    goalSubMenu: false,
    journalSubMenu: false,
    privateSubMenu: false,
    sharedSubMenu: false,
  });

  // State to store fetched journal data
  const [journals, setJournals] = useState([]);

  // Function to toggle submenu visibility
  const toggleSubMenuLocal = (subMenuId) => {
    setSubMenuVisible((prevState) => ({
      ...prevState,
      [subMenuId]: !prevState[subMenuId],
    }));
    toggleSubMenu(subMenuId); // Call the imported function
  };

  // Function to fetch and log journal titles
  const fetchAndLogJournalTitles = async () => {
    try {
      const response = await axios.get("http://localhost:1814/journals");
      const sortedJournals = response.data.data.sort((a, b) => {
        // Sort by 'updatedAt' field in descending order
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });

      // Get the first 6 journals after sorting
      const firstSixJournals = sortedJournals.slice(0, 6);

      // Set the fetched journals to state
      setJournals(firstSixJournals);
    } catch (error) {
      console.error("Error fetching journals:", error);
    }
  };

  // Call the function to fetch and log journal titles when the component mounts
  useEffect(() => {
    fetchAndLogJournalTitles();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <nav role="navigation">
      <div id="menuToggle">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
        <ul id="menu">
          <div className="sidenav" id="sidenav">
            <div
              className={`nav-item ${
                subMenuVisible.goalSubMenu ? "active" : ""
              }`}
              id="goalNavItem"
            >
              <a href="#" onClick={() => toggleSubMenuLocal("goalSubMenu")}>
                Goals
              </a>
              <div
                className={`subnav ${
                  subMenuVisible.goalSubMenu ? "active" : ""
                }`}
                id="goalSubMenu"
              >
                <a href="#">Sustainability goal 1</a>
                <a href="#">Sustainability goal 2</a>
                <a href="#">Sustainability goal 3</a>
                <a href="#">Sustainability goal 4</a>
                <a href="#">Sustainability goal 5</a>
                <a href="#">Sustainability goal 6</a>
              </div>
            </div>
            <div
              className={`nav-item ${
                subMenuVisible.journalSubMenu ? "active" : ""
              }`}
              id="journalNavItem"
            >
              <a href="#" onClick={() => toggleSubMenuLocal("journalSubMenu")}>
                Journals
              </a>
              <div
                className={`subnav ${
                  subMenuVisible.journalSubMenu ? "active" : ""
                }`}
                id="journalSubMenu"
              >
                {journals.map((journal, index) => (
                  <Link key={index} to={`/journals/edit/${journal._id}`}>
                    {journal.title}
                  </Link>
                ))}
              </div>
            </div>
            <div
              className={`nav-item ${
                subMenuVisible.privateSubMenu ? "active" : ""
              }`}
              id="privateNavItem"
            >
              <a href="#" onClick={() => toggleSubMenuLocal("privateSubMenu")}>
                Private
              </a>
              <div
                className={`subnav ${
                  subMenuVisible.privateSubMenu ? "active" : ""
                }`}
                id="privateSubMenu"
              >
                <a href="#">Private 1</a>
                <a href="#">Private 2</a>
                <a href="#">Private 3</a>
              </div>
            </div>
            <div
              className={`nav-item ${
                subMenuVisible.sharedSubMenu ? "active" : ""
              }`}
              id="sharedNavItem"
            >
              <a href="#" onClick={() => toggleSubMenuLocal("sharedSubMenu")}>
                Shared
              </a>
              <div
                className={`subnav ${
                  subMenuVisible.sharedSubMenu ? "active" : ""
                }`}
                id="sharedSubMenu"
              >
                <a href="#">Shared file 1</a>
                <a href="#">Shared file 2</a>
                <a href="#">Shared file 3</a>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
