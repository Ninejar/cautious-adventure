import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Loading from '../Loading'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:1814/users/login', {
        email,
        password,
      });

      // Extract the token from the response
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem('auth-token', token);

      // Redirect to the home page or any other desired route
      navigate('/'); // Replace with your desired route
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error);
      // Handle login error
    }
  };
  return (
    <div className='app'>
      <div className='content'>
      
      {loading ? <Loading /> : ''}

      <div className="create_journal">
        <input id="email" type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input id="password" type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
         
        </div>

        <button onClick={handleLogin}>
          Login
        </button>
      </div>
      </div>
  )
}

export default Login