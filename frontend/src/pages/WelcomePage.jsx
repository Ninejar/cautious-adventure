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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus,
            tempore.
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae sint
            natus rerum vitae commodi, ducimus suscipit dolores corporis, iusto
            dignissimos nihil a. Tempore doloribus quia mollitia fugiat
            doloremque aperiam ipsam soluta eos ullam laborum assumenda, qui
            vitae exercitationem ad ex, sit enim cum alias veniam nisi.
            Voluptate libero laboriosam saepe neque? Voluptate accusantium
            voluptas molestias distinctio vitae labore quis obcaecati quas
            velit, dolorum est eaque fuga, incidunt dolores nisi ex ab
            reiciendis quae itaque qui dolore sequi pariatur! Nisi architecto
            quam soluta accusamus molestias reprehenderit eveniet reiciendis, ex
            corrupti alias quaerat aliquid iusto consequuntur. Rerum laudantium
            facere dignissimos temporibus sit.
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
