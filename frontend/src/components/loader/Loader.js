import React from 'react';
import './Loader.css';

export default function Loader() {
  return (
    <div className="content__loader">
      <div className="preloader">
        <div className="preloader__row">
          <div className="preloader__item" />
        </div>
        <div className="preloader__row">
          <div className="preloader__item" />
        </div>
        <div className="preloader__row">
          <div className="preloader__item" />
        </div>
        <div className="preloader__row">
          <div className="preloader__item" />
        </div>
        <div className="preloader__row">
          <div className="preloader__item" />
        </div>
      </div>
    </div>
  );
}
