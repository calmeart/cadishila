import React, { useState } from 'react';

import "./StarRating.css";

function StarRating({ rating, setRating }){
  const [hoverValue, setHoverValue] = useState(0);

  function handleMouseEnter(e) {
    const { value } = e.target;
    setHoverValue(Number(value));
  };

  function handleMouseLeave() {
    if (rating > 0) {
      setHoverValue(rating);
    } else {
      setHoverValue(0);
    }
  };

  function handleRatingClick(e) {
    const { value } = e.target;
    setRating(Number(value));
  };

  return (
    <div className="starRating">
      <div className="starBox">
        <input className="starInputHalf" name="starRatingInput" id="starOneHalf" type="radio" value="0.5" onClick={handleRatingClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        <label className="starLabel" htmlFor="starOneHalf"></label>
        <input className="starInputFull" name="starRatingInput" id="starOneFull" type="radio" value="1" onClick={handleRatingClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        <label className="starLabel" htmlFor="starOneFull"></label>
        <i className={ ( hoverValue < 0.5 ) ? "bi bi-star" : (hoverValue === 0.5) ? "bi bi-star-half" : "bi bi-star-fill" }></i>
      </div>
      <div className="starBox">
        <input className="starInputHalf" name="starRatingInput" id="starOneHalf" type="radio" value="1.5" onClick={handleRatingClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        <label className="starLabel" htmlFor="starOneHalf"></label>
        <input className="starInputFull" name="starRatingInput" id="starOneFull" type="radio" value="2" onClick={handleRatingClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        <label className="starLabel" htmlFor="starOneFull"></label>
        <i className={ ( hoverValue < 1.5 ) ? "bi bi-star" : (hoverValue === 1.5) ? "bi bi-star-half" : "bi bi-star-fill" }></i>
      </div>
      <div className="starBox">
        <input className="starInputHalf" name="starRatingInput" id="starOneHalf" type="radio" value="2.5" onClick={handleRatingClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        <label className="starLabel" htmlFor="starOneHalf"></label>
        <input className="starInputFull" name="starRatingInput" id="starOneFull" type="radio" value="3" onClick={handleRatingClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        <label className="starLabel" htmlFor="starOneFull"></label>
        <i className={ ( hoverValue < 2.5 ) ? "bi bi-star" : (hoverValue === 2.5) ? "bi bi-star-half" : "bi bi-star-fill" }></i>
      </div>
      <div className="starBox">
        <input className="starInputHalf" name="starRatingInput" id="starOneHalf" type="radio" value="3.5" onClick={handleRatingClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        <label className="starLabel" htmlFor="starOneHalf"></label>
        <input className="starInputFull" name="starRatingInput" id="starOneFull" type="radio" value="4" onClick={handleRatingClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        <label className="starLabel" htmlFor="starOneFull"></label>
        <i className={ ( hoverValue < 3.5 ) ? "bi bi-star" : (hoverValue === 3.5) ? "bi bi-star-half" : "bi bi-star-fill" }></i>
      </div>
      <div className="starBox">
        <input className="starInputHalf" name="starRatingInput" id="starOneHalf" type="radio" value="4.5" onClick={handleRatingClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        <label className="starLabel" htmlFor="starOneHalf"></label>
        <input className="starInputFull" name="starRatingInput" id="starOneFull" type="radio" value="5" onClick={handleRatingClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        <label className="starLabel" htmlFor="starOneFull"></label>
        <i className={ ( hoverValue < 4.5 ) ? "bi bi-star" : (hoverValue === 4.5) ? "bi bi-star-half" : "bi bi-star-fill" }></i>
      </div>
    </div>
  )
}

export default StarRating;
