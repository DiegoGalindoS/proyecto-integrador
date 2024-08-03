import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './mylistButton.css';  

function ButtonList({ buttonText, userId, isCreateButton, to }) {
  const [listName, setListName] = useState('');
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();

  const handleAddList = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          name: listName,
        }),
      });

      if (response.ok) {
        const newList = await response.json();
        console.log('List added:', newList);
        navigate(`/my-list/${newList.id}`);
      } else {
        console.error('Failed to add list:', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="button-container">
      {isCreateButton ? (
        <>
          {showInput ? (
            <div className="input-container">
              <input
                type="text"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                placeholder="Enter list name"
                className="input-field"
              />
              <button onClick={handleAddList} className="submit-button">
                Send
              </button>
            </div>
          ) : (
            <button onClick={() => setShowInput(true)} className="main-button">
              {buttonText}
            </button>
          )}
        </>
      ) : (
        <a href={to} className="main-button">{buttonText}</a>
      )}
    </div>
  );
}

export default ButtonList;
