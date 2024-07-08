import React from 'react';
import { Link } from 'react-router-dom';
import './Mylist_button.css';
import './index.css'

function ButtonList({ buttonText, to }) {
  return (
    <div className="button-container">
      <Link to={to} className="large-button">{buttonText}</Link>
    </div>
  );
}

export default ButtonList;
