// NotFoundPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss'; // Import the SCSS file

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404 - Not Found</h1>
      <p className="not-found-text">The page you are looking for might be in another castle!</p>
      <Link to="/" className="not-found-link">Go Home</Link>
    </div>
  );
}

export default NotFoundPage;
