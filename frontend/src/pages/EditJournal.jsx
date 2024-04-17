import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineDelete } from 'react-icons/md';
import Navbar from "../components/NavBar/Navbar";
import BackButton from '../components/BackButton/BackButton';
import Loading from '../components/Loading';
import Page from '../components/DocumentPage/DocumentPage';
import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal'; // Import the ConfirmationModal component
import 'react-quill/dist/quill.snow.css'; 
import '../components/DocumentPage/sheets-of-paper.css';
import '../components/DocumentPage/sheets-of-paper-a4.css';

const EditJournal = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [attachmentToDelete, setAttachmentToDelete] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem('auth-token');
  const config = {
    headers: {
      'auth-token': token
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
        setAttachments(Array.from(new Set(res.data.journal.fileURL))); // Set unique attachments
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console.');
        console.log(error);
      });
  }, []);

  const handleEditJournal = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('visibility', visibility);
  
    // Append all attachments
    attachments.forEach((attachment) => {
      formData.append('file', attachment);
    });
  
    setLoading(true);
    axios
      .put(`http://localhost:1814/journals/${id}`, formData, config)
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

  const handleAttachmentsChange = (e) => {
    // Convert FileList to an array
    const selectedFiles = Array.from(e.target.files);
    // Update attachments state by concatenating new files with existing ones
    setAttachments(prevAttachments => [...prevAttachments, ...selectedFiles]);
  };

  const handleRemoveAttachment = (indexToRemove) => {
    setAttachmentToDelete(indexToRemove); // Set the index of the attachment to delete
    setIsModalOpen(true); // Open the confirmation modal
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false); // Close the confirmation modal
    setAttachmentToDelete(null); // Clear the attachment to delete
  };

  const handleConfirmDelete = () => {
  // Get the index of the attachment to delete
  const attachmentIndexToDelete = attachmentToDelete;

  // Remove the attachment from the attachments array
  setAttachments(prevAttachments =>
    prevAttachments.filter((_, index) => index !== attachmentIndexToDelete)
  );

  setIsModalOpen(false); // Close the confirmation modal
  setAttachmentToDelete(null); // Clear the attachment to delete
};
  
  

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <div className="backbutton">
          <BackButton destination='/journals/list' />
          <h1>Edit journal</h1>
        </div>

        {loading ? <Loading /> : ''}

        <div className="create_journal">
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Page content={content} onChange={(value) => setContent(value)} />
          <div className="attachFile_container">
            {/* Display old attachments */}
            {attachments.map((attachment, index) => (
              <div key={index}>
                <div className='attachment-container'>
                  <a href={`http://localhost:1814/${attachment}`} target="_blank" rel="noopener noreferrer">
                    <div className='display_attachment_img_container'>
                      File {index + 1}
                      <img className="display_attachment_img" src={`http://localhost:1814/${attachment}`} alt={`Attachment ${index + 1}`} />
                    </div>
                  </a>
                  <button className='remove_attachment' onClick={() => handleRemoveAttachment(index)}><MdOutlineDelete /></button>
                </div>
              </div>
            ))}
          </div>
          <input type="file" multiple onChange={handleAttachmentsChange} />
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
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        fileName={`File ${attachmentToDelete + 1}`} 
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default EditJournal;
