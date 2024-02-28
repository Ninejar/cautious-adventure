import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Loading from '../components/Loading'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar'

const CreateJournal = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [visibility, setVisibility] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSaveJournal = () => {
    const data = {
      title, 
      content,
      visibility,
    } 
    setLoading(true)
    axios
      .post('http://localhost:1814/journals', data)
      .then(()=>{
        setLoading(false)
        navigate('/journals/')
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
      <div>
      
      <BackButton />
      <h1>Create journal</h1>
      {loading ? <Loading /> : ''}

      <div className="create_journal">
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Content</label>
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />

        <div className='radio_container'>  
           <label>Visibility</label> 
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