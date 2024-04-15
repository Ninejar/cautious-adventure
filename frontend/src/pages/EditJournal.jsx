// import React, { useState, useEffect } from 'react'
// import BackButton from '../components/BackButton'
// import Loading from '../components/Loading'
// import axios from 'axios'
// import {useNavigate, useParams} from 'react-router-dom'
// import Navbar from '../components/Navbar'

// const EditJournal = () => {
//   const [title, setTitle] = useState('')
//   const [content, setContent] = useState('')
//   const [visibility, setVisibility] = useState('')
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()
//   const {id} = useParams()
//   useEffect(() => {
//     setLoading(true)
//     axios.get(`http://localhost:1814/journals/${id}`)
//     .then((res) => {
//       setTitle(res.data.journal.title)
//       setContent(res.data.journal.content)
//       setVisibility(res.data.journal.visibility)
//       setLoading(false)
//     }).catch((error) => {
//       setLoading(false)
//       alert('An error happened. Please check console.')
//       console.log(error)
//     })
//   }, [])

//   const handleEditJournal = () => {
//     const data = {
//       title, 
//       content,
//       visibility,
//     } 
//     setLoading(true)
//     axios
//       .put(`http://localhost:1814/journals/${id}`, data)
//       .then(()=>{
//         setLoading(false)
//         navigate('/journals/list')
//       })
//       .catch((error) => {
//         setLoading(false)
//         alert('An error happened. Please check console')
//         console.log(error)
//       })
//   }
//   return (
//     <div className='app'>
//       <Navbar />
//       <div className='content'>
      
//       <BackButton destination='/journals/list' />
//       <h1>Edit journal</h1>
//       {loading ? <Loading /> : ''}

//       <div className="create_journal">
//         <label>Title</label>
//         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

//         <label>Content</label>
//         <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />

//         <div className='radio_container'>  
//            <label>Visibility</label> 
//            <div> <input
//               type="radio"
//               id="public"
//               value="Public"
//               checked={visibility === 'Public'}
//               onChange={(e) => setVisibility(e.target.value)}
//             />
//             <label htmlFor="public">Public</label></div>
           
//            <div>  
//              <input
//               type="radio"
//               id="private"
//               value="Private"
//               checked={visibility === 'Private'}
//               onChange={(e) => setVisibility(e.target.value)}
//             />
//             <label htmlFor="private">Private</label>
//            </div>
//         </div>
//         <button onClick={handleEditJournal}>
//           Save
//         </button>
//       </div>
//       </div>
    
//     </div>
//   )
// }

// export default EditJournal

// EditJournal.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../components/NavBar/Navbar";
import BackButton from '../components/BackButton/BackButton';
import Loading from '../components/Loading';
import Page from '../components/DocumentPage/DocumentPage';
import '../components/DocumentPage/sheets-of-paper.css'
import '../components/DocumentPage/sheets-of-paper-a4.css'

const EditJournal = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem('auth-token'); // Retrieve token from local storage
    const config = {
      headers: {
        'auth-token': token // Set the token in the request headers
      }
    };


  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:1814/journals/${id}`, config)
      .then((res) => {
        setTitle(res.data.journal.title);
        setContent(res.data.journal.content);
        setVisibility(res.data.journal.visibility);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console.');
        console.log(error);
      });
  }, []);

  const handleEditJournal = () => {
    const data = {
      title,
      content,
      visibility,
    };
    setLoading(true);
    axios
      .put(`http://localhost:1814/journals/${id}`, data, config)
      .then(() => {
        setLoading(false);
        navigate('/journals/list');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  };

  return (
    <div className="app">
      <Navbar />
      <div className="content">
      <div className="backbutton" ><BackButton destination='/journals/list' /> <h1>Edit journal</h1></div>

        {loading ? <Loading /> : ''}

        <div className="create_journal">
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

          {/* Use the Page component for content editing */}
          <Page content={content} onChange={(e) => setContent(e.target.value)} />

          <div className="radio_container">
            <label>Set visibility</label> 
            <div>
              <input
                type="radio"
                id="private"
                value="Private"
                checked={visibility === 'Private'}
                onChange={(e) => setVisibility(e.target.value)}
              />
              <label htmlFor="private">Keep private</label>
            </div>
            <div>
              <input
                type="radio"
                id="public"
                value="Public"
                checked={visibility === 'Public'}
                onChange={(e) => setVisibility(e.target.value)}
              />
              <label htmlFor="public">Share with teacher</label>
            </div>

            
          </div>
          <button onClick={handleEditJournal}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditJournal;
