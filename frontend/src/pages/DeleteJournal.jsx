import React, {useState} from 'react'
import BackButton from '../components/BackButton/BackButton'
import Loading from '../components/Loading'
import Navbar from "../components/NavBar/Navbar";
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteJournal = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()

  const token = localStorage.getItem('auth-token'); // Retrieve token from local storage
  const config = {
    headers: {
      'auth-token': token // Set the token in the request headers
    }
  };
  const handleDeleteJournal = () => {
    setLoading(true)
    axios
      .delete(`http://localhost:1814/journals/${id}`,config)
      .then(() => {
        setLoading(false)
        navigate('/journals/list')
      })
      .catch ((error) => {
        setLoading(false)
        alert('An error happened. Please check console')
        console.log(error)
      })
  }
  return (
    <div className='app'>
      <Navbar />

      <div className='content'>
      <div className="backbutton" ><BackButton destination='/journals/list' /> <h1>Delete journal</h1></div>
        {loading ? <Loading /> : ''}
        <h3>Are you sure you want to delete this journal?</h3>
        <button onClick={handleDeleteJournal}>
          Yes, delete 
        </button>

      </div>
      
    </div>
  )
}

export default DeleteJournal