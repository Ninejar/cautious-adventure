import React, { useState } from 'react'
import BackButton from '../components/BackButton/BackButton'
import Loading from '../components/Loading'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Navbar from "../components/NavBar/Navbar";
import Page from '../components/DocumentPage/DocumentPage';
import '../components/DocumentPage/sheets-of-paper.css'
import '../components/DocumentPage/sheets-of-paper-a4.css'

const CreateJournal = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [visibility, setVisibility] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const token = localStorage.getItem('auth-token'); // Retrieve token from local storage
    const config = {
      headers: {
        'auth-token': token // Set the token in the request headers
      }
    };


  const handleSaveJournal = () => {
    const data = {
      title, 
      content,
      visibility,
    } 
    setLoading(true)
    axios
      .post('http://localhost:1814/journals', data, config)
      .then(()=>{
        setLoading(false)
        navigate('/journals/list')
      })
      .catch((error) => {
        setLoading(false)
        alert('An error happened. Please check console')
        console.log(error)
      })
  }
  return (
    <div className='app'>
      <Navbar />
      <div className='content'>
      <div className="backbutton" ><BackButton destination='/journals/list' /> <h1>Create journal</h1></div>
      
      {loading ? <Loading /> : ''}

      <div className="create_journal">
        <input id="title" type="text" placeholder='Untitled' value={title} onChange={(e) => setTitle(e.target.value)} />

        <Page content={content} onChange={(e) => setContent(e.target.value)} />

        <div className='radio_container'>  
           <label>Set visibility</label> 
           <div> <input
              type="radio"
              id="public"
              value="Public"
              checked={visibility === 'Public'}
              onChange={(e) => setVisibility(e.target.value)}
            />
            <label htmlFor="public">Public</label></div>
           
           <div>  
             <input
              type="radio"
              id="private"
              value="Private"
              checked={visibility === 'Private'}
              onChange={(e) => setVisibility(e.target.value)}
            />
            <label htmlFor="private">Private</label>


           </div>

         
        </div>

    

        <button onClick={handleSaveJournal}>
          Save
        </button>
      </div>
      </div>
    
    </div>
  )
}

export default CreateJournal