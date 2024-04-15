import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import Loading from '../Loading'
import './Login.css'
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:1814/users/login', {
        email,
        password,
      });
  
      // Extract the token from the response
      const { token } = response.data;
  
      if (token) {
        login(token); // Use the login function from AuthContext
        // Decoding JWT token
        const decoded = jwtDecode(token);
  
        // Redirect to URL, based on role
        const redirectTo = decoded.role === "teacher" ? "/teachers" : "/journals";
        console.log(decoded.role)
        navigate(redirectTo);
      } else {
        console.error("Token not found in response:", response.data);
      }
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error);
      // Handle login error
    }
  };
  
  return (
    <div className='login_wrapper'>
      <div className='content login'>
      <h1>Log in</h1>
      
      {loading ? <Loading /> : ''}

      <div className="login_container">
        <input id="email" type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input id="password" type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
         
        <button onClick={handleLogin}>
          Login
        </button>
      </div>

      <p>
          Don't have a user? Sign up <Link to={"/signup"}>here</Link>
        </p>

       
      </div>
      </div>
  )
}

export default Login