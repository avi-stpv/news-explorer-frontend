import React from 'react';
import './Preloader.css';

const Preloader = ({ children }) => (
  <div className="preloader">
    <div className="preloader__loading" />
    <p className="preloader__description">
      {children}
    </p>
  </div>
);

export default Preloader;
