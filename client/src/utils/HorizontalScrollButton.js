import React from 'react';

import "./HorizontalScrollButton.css";

function HorizontalScrollButton({ targetContainer }) {

  function onRightClick() {
    document.getElementById(targetContainer).scrollLeft += 344;
  }

  function onLeftClick() {
    document.getElementById(targetContainer).scrollLeft -= 344;
  }

  return (
    <>
    <button className="scrollButton buttonLeft" onClick={onLeftClick}><i className="bi bi-caret-left-fill"></i></button>
    <button className="scrollButton buttonRight" onClick={onRightClick}><i className="bi bi-caret-right-fill"></i></button>
    </>
  )
}

export default HorizontalScrollButton;
