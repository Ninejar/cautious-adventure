import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../Loading";
import "./Signup.css";
import NewNavbar from "../NavBar/NewNavbar";

const Signup = () => {
  const viteURL = import.meta.env.VITE_URL;

  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveUser = () => {
    const data = {
      fName,
      lName,
      email,
      password,
      role,
    };
    setLoading(true);
    axios
      .post(`${viteURL}/users/signup`, data)
      .then(() => {
        setLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  };
  return (
    <>
     <NewNavbar />

      <div className="signup_wrapper">
        <div className="signup">
          <h1>Sign up</h1>

          {loading ? <Loading /> : ""}

          <div className="signup_container">
            <div className="input_container">
              <input
                id="fname"
                type="text"
                placeholder="First name"
                value={fName}
                onChange={(e) => setfName(e.target.value)}
              />
              <input
                id="lname"
                type="text"
                placeholder="Last name"
                value={lName}
                onChange={(e) => setlName(e.target.value)}
              />
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <label id="select_role_text" htmlFor="">
              Select your position
            </label>

            <div className="radio">
              <div>
                {" "}
                <input
                  type="radio"
                  id="student"
                  value="student"
                  checked={role === "student"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <label htmlFor="student">Student</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="teacher"
                  value="teacher"
                  checked={role === "teacher"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <label htmlFor="teacher">Teacher</label>
              </div>
            </div>

            <button onClick={handleSaveUser}>Signup</button>
          </div>
          <p>
            Already have an account? Log in <Link to={"/login"}>here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
