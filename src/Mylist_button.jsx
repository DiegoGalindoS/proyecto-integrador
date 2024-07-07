import React from 'react';
import './Mylist_button.css'; 

function ButtonList({ buttonText }) {
    return (
        <div className="button-container">
            <button className="large-button">{buttonText}</button>
        </div>
    );
}

export default ButtonList;
