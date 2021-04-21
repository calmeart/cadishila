import React from 'react';

function ReviewCard({ review }) {

  return (
    <div className="reviewCard">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <p className="card-title">{review.user.username}</p>
          <p className="card-title"><i className="bi bi-star-fill"></i> {review.score} / 5</p>
        </div>
        <div className="card-body">
          <p className="card-text text-start">{review.reviewBody}</p>
          <p className="card-text text-muted text-end">{review.createdAt.substr(0, 10)}</p>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard;
