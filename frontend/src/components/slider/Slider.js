import React from 'react';
import './Slider.css';

function Slider({ imgArr, plusSlide, minusSlide, slideIndex }) {

  return (
    <div>
      <div className="slider">
        <div className="item">
          <figure className="image">
            <img src={imgArr[slideIndex]} alt="product" />
          </figure>
        </div>
        <a className="prev" onClick={() => minusSlide(imgArr)}>
          &#10094;
        </a>
        <a className="next" onClick={() => plusSlide(imgArr)}>
          &#10095;
        </a>
      </div>
    </div>
  );
}

export default Slider;
