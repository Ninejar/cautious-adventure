import React, { useState } from 'react';
import BackButton from '../components/BackButton/BackButton';
import Loading from '../components/Loading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/NavBar/Navbar";
import Page from '../components/DocumentPage/DocumentPage';
import 'react-quill/dist/quill.snow.css'; 
import '../components/DocumentPage/sheets-of-paper.css';
import '../components/DocumentPage/sheets-of-paper-a4.css';

const CreateJournal = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [visibility, setVisibility] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSaveJournal = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('visibility', visibility);
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }
    setLoading(true);
    const token = localStorage.getItem('auth-token');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'auth-token': token
      }
    };
    axios
      .post('http://localhost:1814/journals', formData, config)
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
    <div className='app'>
      <Navbar />
      <div className='content'>
        <div className="backbutton">
          <BackButton destination='/journals/list' />
          <h1>Create journal</h1>
        </div>

        {loading ? <Loading /> : ''}

        <div className="create_journal">
          <input id="title" type="text" placeholder='Untitled' value={title} onChange={(e) => setTitle(e.target.value)} />

          <Page content={content} onChange={(value) => setContent(value)} />

          <div className='attachFile_container'>
            <input type="file" multiple onChange={handleFileChange} />
          </div>

          <div className='radio_container'>
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

          <button onClick={handleSaveJournal}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateJournal;
