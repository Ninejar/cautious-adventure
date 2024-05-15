import React, {useState} from 'react'
import BackButton from '../components/BackButton/BackButton'
import Loading from '../components/Loading'
import Navbar from "../components/NavBar/Navbar";
import NewNavbar from "../components/NavBar/NewNavbar";
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteJournal = () => {
  const viteURL = import.meta.env.VITE_URL;

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
      .delete(`${viteURL}/journals/${id}`,config)
      .then(() => {
        setLoading(false)
        localStorage.setItem("toastMessage", "Journal deleted successfully!");
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
      <NewNavbar />

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