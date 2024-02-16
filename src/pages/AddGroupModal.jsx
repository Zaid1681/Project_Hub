import React, { useState } from 'react';
import './AddGroupModal.css';

function AddGroupModal() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [token, setToken] = useState('');

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddGroup = () => {
    if (token.trim() !== '') {
      setGroups([...groups, { token }]);
      setToken('');
      closeModal();
    }
  };

  return (
    <div className="app-container">
      <button onClick={openModal} className="add-group-button">
        Join Group
      </button>
      {isModalOpen && (
        <div className="modal-container">
          <div className="modal">
            <h2>Join Group</h2>
            <div>
              <label>Token:</label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
            <button onClick={handleAddGroup} className="submit-button">
              Submit
            </button>
            <button onClick={closeModal} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddGroupModal;
