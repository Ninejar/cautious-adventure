import React from 'react';
import './ConfirmationModal.css'
const ConfirmationModal = ({ isOpen, fileName, onCancel, onConfirm }) => {
  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <h2>Confirmation</h2>
          <p>Are you sure you want to delete "{fileName}"?</p>
          <div className="modal-buttons">
            <button onClick={onCancel}>Cancel</button>
            <button onClick={onConfirm}>Delete</button>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmationModal;
