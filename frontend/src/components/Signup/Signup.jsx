import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../Loading";
import "./Signup.css";
import NewNavbar from "../NavBar/NewNavbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const viteURL = import.meta.env.VITE_URL;

  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState()
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //   }
  // }, [error]);

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
        console.log(error);
        setError(error.response.data); 

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
                disabled={loading}
              />
              {error && error.includes("first name") && <p className="errorMsg">{error}</p>}
              <input
                id="lname"
                type="text"
                placeholder="Last name"
                value={lName}
                onChange={(e) => setlName(e.target.value)}
                disabled={loading}
              />
              {error && error.includes("last name") && <p className="errorMsg">{error}</p>}

              
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              {error && error.includes("email") || error && error.includes("Email") && <p className="errorMsg">{error}</p>}
              
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            {error && error.includes("password") || error && error.includes("8 characters") && <p className="errorMsg">{error}</p>}
            

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
                  disabled={loading}
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
                  disabled={loading}
                />
                <label htmlFor="teacher">Teacher</label>
              </div>

            </div>
            <div>{error && error.includes("role") && <p className="errorMsg">{error}</p>}</div>

            <button onClick={handleSaveUser} disabled={loading}>Signup</button>
          </div>
          <p>
            Already have an account? Log in <Link to={"/login"}>here</Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Signup;
