import React, {useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import Loading from '../components/Loading'
import BackButton from '../components/BackButton/BackButton'
import Navbar from '../components/Navbar'
import '../components/ShowJournal/ShowJournal.css'

const ShowJournal = () => {
  const [journal, setJournal] = useState({})
  const [loading, setLoading] = useState(false)
  const {id} = useParams()

  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:1814/journals/${id}`)
      .then((res) => {
        console.log("Data from API:", res.data);
        console.log("Id:", journal._id);
        console.log("Title:", journal.title);
        console.log("Content:", journal.content);
        console.log("Visibility:", journal.visibility);
        setJournal(res.data.journal)
        setLoading(false)
      })
      .catch ((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])
  return (
    <div className='app'>
      <Navbar />
      <div className='content'>
      <div className="backbutton" ><BackButton destination='/journals/list' /></div>
        
        <h1>Show journal</h1>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {/* <div className='journal_data'>
              <h2>Id: </h2>
              <span>{journal._id}</span>
            </div> */}

            <div className='journal_data'>
              <h2>Title: </h2>
              <span>{journal.title}</span>
            </div>

            <div className='journal_data'>
              <h2>Content: </h2>
              <span><pre>{journal.content}</pre></span>
            </div>

            <div className='journal_data'>
              <h2>Time of creation: </h2>
              <span>{new Date(journal.createdAt).toString()}</span>
            </div>

            <div className='journal_data'>
              <h2>Last edited: </h2>
              <span>{new Date(journal.updatedAt).toString()}</span>
            </div>

            <div className='journal_data'>
              <h2>Visibility: </h2>
              <span>{journal.visibility}</span>
            </div>

          </div>
          
        )}
      </div>
    </div>
  )
}

export default ShowJournal