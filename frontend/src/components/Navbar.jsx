// Navbar.jsx
import React, { useState } from 'react';
import { toggleSubMenu } from '../testjsfile'; // Adjust the path accordingly

const Navbar = () => {
  // State to manage submenu visibility
  const [subMenuVisible, setSubMenuVisible] = useState({
    goalSubMenu: false,
    journalSubMenu: false,
    privateSubMenu: false,
    sharedSubMenu: false,
  });

  // Function to toggle submenu visibility
  const toggleSubMenuLocal = (subMenuId) => {
    setSubMenuVisible((prevState) => ({
      ...prevState,
      [subMenuId]: !prevState[subMenuId],
    }));
    toggleSubMenu(subMenuId); // Call the imported function
  };

  return (
<nav role="navigation">
  <div id="menuToggle">

    <input type="checkbox" />
    
    <span></span>
    <span></span>
    <span></span>

    <ul id="menu">
      <div className="sidenav" id="sidenav">
      <div className={`nav-item ${subMenuVisible.goalSubMenu ? 'active' : ''}`} id="goalNavItem">
        <a href="#" onClick={() => toggleSubMenuLocal('goalSubMenu')}>Goals</a>
        <div className={`subnav ${subMenuVisible.goalSubMenu ? 'active' : ''}`} id="goalSubMenu">
          <a href="#">Sustainability goal 1</a>
          <a href="#">Sustainability goal 2</a>
          <a href="#">Sustainability goal 3</a>
          <a href="#">Sustainability goal 4</a>
          <a href="#">Sustainability goal 5</a>
          <a href="#">Sustainability goal 6</a>
        </div>
      </div>

      <div className={`nav-item ${subMenuVisible.journalSubMenu ? 'active' : ''}`} id="journalNavItem">
        <a href="#" onClick={() => toggleSubMenuLocal('journalSubMenu')}>Journals</a>
        <div className={`subnav ${subMenuVisible.journalSubMenu ? 'active' : ''}`} id="journalSubMenu">
          <a href="#">My First Journal</a>
          <a href="#">Journal about stuff</a>
          <a href="#">My sustainability journal</a>
          <a href="#">School project journal</a>
        </div>
      </div>

      <div className={`nav-item ${subMenuVisible.privateSubMenu ? 'active' : ''}`} id="privateNavItem">
        <a href="#" onClick={() => toggleSubMenuLocal('privateSubMenu')}>Private</a>
        <div className={`subnav ${subMenuVisible.privateSubMenu ? 'active' : ''}`} id="privateSubMenu">
          <a href="#">Private 1</a>
          <a href="#">Private 2</a>
          <a href="#">Private 3</a>
        </div>
      </div>

      <div className={`nav-item ${subMenuVisible.sharedSubMenu ? 'active' : ''}`} id="sharedNavItem">
        <a href="#" onClick={() => toggleSubMenuLocal('sharedSubMenu')}>Shared</a>
        <div className={`subnav ${subMenuVisible.sharedSubMenu ? 'active' : ''}`} id="sharedSubMenu">
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
