import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Loading from '../Loading'


const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSaveUser = () => {
    const data = {
      name,
      email, 
      password,
      role
    } 
    setLoading(true)
    axios
      .post('http://localhost:1814/users/signup', data)
      .then(()=>{
        setLoading(false)
        navigate('/users/login')
      })
      .catch((error) => {
        setLoading(false)
        alert('An error happened. Please check console')
        console.log(error)
      })
  }
  return (
    <div className='app'>
      <div className='content'>
      
      {loading ? <Loading /> : ''}

      <div className="create_journal">
        <input id="name" type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
        <input id="email" type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input id="password" type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />

        <div className='radio_container'>  
           <label>Set visibility</label> 
           <div> <input
              type="radio"
              id="student"
              value="student"
              checked={role === 'student'}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="student">student</label></div>
           
           <div>  
             <input
              type="radio"
              id="teacher"
              value="teacher"
              checked={role === 'teacher'}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="teacher">teacher</label>


           </div>

         
        </div>

        <button onClick={handleSaveUser}>
          Signup
        </button>
      </div>
      </div>
    
    </div>
  )
}

export default Signup