import React from 'react';

function CenteredSpinner() {
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <div className="spinner-border text-dark" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
};

export default CenteredSpinner;
