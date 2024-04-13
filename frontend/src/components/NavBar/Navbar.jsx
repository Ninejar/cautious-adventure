import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { toggleSubMenu } from "./testjsfile"; // Import toggleSubMenu function from testjsfile
import "./navBarStyle.css"; // Import CSS for Navbar styling

const Navbar = () => {
  // State to manage submenu visibility
  const [subMenuVisible, setSubMenuVisible] = useState({ goalSubMenu: false, journalSubMenu: false, privateSubMenu: false, sharedSubMenu: false });

  // State to store fetched journal data
  const [journals, setJournals] = useState([]);
  const [privateJournals, setPrivateJournals] = useState([]);
  const [sharedJournals, setSharedJournals] = useState([]);

  // Function to toggle submenu visibility
  const toggleSubMenuLocal = (subMenuId) => {
    setSubMenuVisible((prevState) => ({ ...prevState, [subMenuId]: !prevState[subMenuId] }));
    toggleSubMenu(subMenuId); // Call the imported function
  };

  const token = localStorage.getItem('auth-token'); // Retrieve token from local storage
  const config = {
    headers: {
      'auth-token': token // Set the token in the request headers
    }
  };


  // Function to fetch and log journal titles
  const fetchAndLogJournalTitles = async () => {
    try {
      const response = await axios.get("http://localhost:1814/journals", config); // Fetch journals data from API
      const sortedJournals = response.data.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

      // Get the first 6 journals after sorting
      const firstSixJournals = sortedJournals.slice(0, 6);
      setJournals(firstSixJournals); // Set the fetched journals to state

      // Filter private journals
      const privateJournals = sortedJournals.filter((journal) => journal.visibility === "Private");
      setPrivateJournals(privateJournals.slice(0, 6)); // Set the filtered private journals to state

      // Filter shared journals
      const sharedJournals = sortedJournals.filter((journal) => journal.visibility === "Public");
      setSharedJournals(sharedJournals.slice(0, 6)); // Set the filtered shared journals to state
    } catch (error) {
      console.error("Error fetching journals:", error); // Log error if fetching journals fails
    }
  };

  // Call the function to fetch and log journal titles when the component mounts
  useEffect(() => { fetchAndLogJournalTitles(); }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <nav role="navigation">
      <div id="menuToggle">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
        <ul id="menu">
          <div className="sidenav" id="sidenav">
            {/* Goals submenu */}
            <div className={`nav-item ${subMenuVisible.goalSubMenu ? "active" : ""}`} id="goalNavItem">
              <a href="#" onClick={() => toggleSubMenuLocal("goalSubMenu")}>Goals</a>
              <div className={`subnav ${subMenuVisible.goalSubMenu ? "active" : ""}`} id="goalSubMenu">
                <a href="#">Sustainability goal 1</a>
                <a href="#">Sustainability goal 2</a>
                <a href="#">Sustainability goal 3</a>
                <a href="#">Sustainability goal 4</a>
                <a href="#">Sustainability goal 5</a>
                <a href="#">Sustainability goal 6</a>
              </div>
            </div>

            {/* Journals submenu */}
            <div className={`nav-item ${subMenuVisible.journalSubMenu ? "active" : ""}`} id="journalNavItem">
              <a href="#" onClick={() => toggleSubMenuLocal("journalSubMenu")}>Journals</a>
              <div className={`subnav ${subMenuVisible.journalSubMenu ? "active" : ""}`} id="journalSubMenu">
                {/* Map through journals and display them */}
                {journals.map((journal, index) => <Link key={index} to={`/journals/edit/${journal._id}`}>{journal.title}</Link>)}
              </div>
            </div>

            {/* Private journals submenu */}
            <div className={`nav-item ${subMenuVisible.privateSubMenu ? "active" : ""}`} id="privateNavItem">
              <a href="#" onClick={() => toggleSubMenuLocal("privateSubMenu")}>Private</a>
              <div className={`subnav ${subMenuVisible.privateSubMenu ? "active" : ""}`} id="privateSubMenu">
                {/* Map through private journals and display them */}
                {privateJournals.map((journal, index) => <Link key={index} to={`/journals/edit/${journal._id}`}>{journal.title}</Link>)}
              </div>
            </div>

            {/* Shared journals submenu */}
            <div className={`nav-item ${subMenuVisible.sharedSubMenu ? "active" : ""}`} id="sharedNavItem">
              <a href="#" onClick={() => toggleSubMenuLocal("sharedSubMenu")}>Shared</a>
              <div className={`subnav ${subMenuVisible.sharedSubMenu ? "active" : ""}`} id="sharedSubMenu">
                {/* Map through shared journals and display them */}
                {sharedJournals.map((journal, index) => <Link key={index} to={`/journals/edit/${journal._id}`}>{journal.title}</Link>)}
              </div>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
