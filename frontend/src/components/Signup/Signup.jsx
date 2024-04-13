import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import Loading from '../Loading'
import './Signup.css'


const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [position, setPosition] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSaveUser = () => {
    const data = {
      name,
      email, 
      password,
      position
    } 
    setLoading(true)
    axios
      .post('http://localhost:1814/users/signup', data)
      .then(()=>{
        setLoading(false)
        navigate('/login')
      })
      .catch((error) => {
        setLoading(false)
        alert('An error happened. Please check console')
        console.log(error)
      })
  }
  return (
    <div className='app'>
      <div className='content signup'>
      <h1>Sign up</h1>
      
      {loading ? <Loading /> : ''}

      

      <div className="signup_container">

        <div className='input_container'>
          <input id="name" type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
          <input id="email" type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input id="password" type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        
        <label id='select_role_text' htmlFor="">Select your position</label>
        
        <div className='radio'>  
           <div> <input
              type="radio"
              id="student"
              value="student"
              checked={position === 'student'}
              onChange={(e) => setPosition(e.target.value)}
            />
            <label htmlFor="student">Student</label></div>
           
           <div>  
             <input
              type="radio"
              id="teacher"
              value="teacher"
              checked={position === 'teacher'}
              onChange={(e) => setPosition(e.target.value)}
            />
            <label htmlFor="teacher">Teacher</label>


           </div>

         
        </div>

        <button onClick={handleSaveUser}>
          Signup
        </button>
      </div>
      <p>
          Already have an account? Log in <Link to={"/login"}>here</Link>
        </p>
      </div>
      
    
    </div>
  )
}

export default Signup