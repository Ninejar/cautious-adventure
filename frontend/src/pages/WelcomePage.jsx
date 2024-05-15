import React from "react";
import { Link } from "react-router-dom";
import "../components/WelcomePage/WelcomePage.css"; 
import NewNavbar from "../components/NavBar/NewNavbar";

const WelcomePage = () => {
  return (
    <>
      <NewNavbar />
      <div className="welcome_wrapper">
        <div className="welcome_text">
          <h1>
            Welcome to Sustainability Diary!
          </h1>
          <p>
          Empower students to become stewards of the environment with our interactive app. Teachers create engaging sustainability tasks, while students choose and reflect on their interests. Journal your journey through completing tasks, earning badges along the way, and culminating in a prestigious Sustainability Certificate. Shape a greener, more sustainable future, one task at a time.
          </p>

          <div className="welcome_signup_wrapper">
            <a
              href="/signup"
              data-testid="loginyouknow"
              className="welcome_signup"
            >
              Write your first journal now!
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
