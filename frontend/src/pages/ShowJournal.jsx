import React, {useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import Loading from '../components/Loading'
import BackButton from '../components/BackButton/BackButton'
import Navbar from "../components/NavBar/Navbar";
import '../components/ShowJournal/ShowJournal.css'

const ShowJournal = () => {
  const [journal, setJournal] = useState({});
  const [loading, setLoading] = useState(false);
  const [uniqueAttachments, setUniqueAttachments] = useState([]);
  const { id } = useParams();

  const token = localStorage.getItem('auth-token');
  const config = {
    headers: {
      'auth-token': token,
    },
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:1814/journals/${id}`, config)
      .then((res) => {
        setJournal(res.data.journal);
        setLoading(false);
        // Extract unique attachment URLs and store them in uniqueAttachments state
        const uniqueUrls = Array.isArray(res.data.journal.fileURL)
          ? Array.from(new Set(res.data.journal.fileURL))
          : [];
        setUniqueAttachments(uniqueUrls);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const renderAttachment = () => {
    if (uniqueAttachments.length > 0) {
      return uniqueAttachments.map((url, index) => {
        const fileExtension = url.split('.').pop().toLowerCase();
        if (fileExtension === 'pdf') {
          return (
            <div key={index}>
              <a
                className="file"
                href={`http://localhost:1814/${url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Attachment
              </a>
            </div>
          );
        } else if (
          fileExtension === 'jpg' ||
          fileExtension === 'jpeg' ||
          fileExtension === 'png' ||
          fileExtension === 'gif'
        ) {
          return (
            <div  key={index}>
              <img className="file" src={`http://localhost:1814/${url}`} alt="Attachment" />
            </div>
          );
        } else {
          return (
            <div key={index}>
              <a
                className="file"
                href={`http://localhost:1814/${url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Attachment
              </a>
            </div>
          );
        }
      });
    } else {
      return <span>No attachments</span>;
    }
  };

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <div className="backbutton">
          <BackButton destination="/journals/list" />
          <h1>Show journal</h1>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
          <div className='journal_data_container'>
            <div className="journal_data">
              <h2>Title: </h2>
              <span>{journal.title}</span>
            </div>
            <div className="journal_data">
              <h2>Time of creation: </h2>
              <span>{new Date(journal.createdAt).toString()}</span>
            </div>
            <div className="journal_data">
              <h2>Last edited: </h2>
              <span>{new Date(journal.updatedAt).toString()}</span>
            </div>
            <div className="journal_data">
              <h2>Visibility: </h2>
              <span>{journal.visibility}</span>
            </div>
            <div className="journal_data">
              <h2>File uploads:</h2>
              <div className='file_uploads_container'>
              {renderAttachment()}
              </div>
              
            </div>

            <div className="journal_data journal_content_wrapper">
              <h2>Content: </h2>
              <div className='journal_content'>
                <div dangerouslySetInnerHTML={{ __html: journal.content }} />
              </div>
              
            </div>
          </div>
          

            
          </>
        )}
      </div>
    </div>
  );
};


export default ShowJournal