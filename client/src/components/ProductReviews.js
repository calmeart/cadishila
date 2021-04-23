import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { AddReview, GetProductReviews } from "../graphql/review-queries";
import { GetProductQuery } from "../graphql/queries";
import { AuthContext } from "../context/auth";
import ReviewCard from "./ReviewCard";
import StarRating from "../utils/StarRating";
import HorizontalScrollButton from "../utils/HorizontalScrollButton";

function DisplayReviews({ productId }) {
  const { loading, error, data } = useQuery(GetProductReviews, {
    variables: {
      id: productId
    }
  });

  if (loading) return <p className="errorMessage">Loading...</p>;
  if (error) return <p className="errorMessage">Error: {error.message}</p>;

  return data.productReviews.filter(review => review.reviewBody !== "").map(review => <ReviewCard key={review.id} review={review} /> );
};

function ProductReviews({ appointError, productId, reviews }) {
  const [ reviewBody, setReviewBody ] = useState("");
  const [ rating, setRating ] = useState(0);

  let averageScore = 0;
  if (reviews.length > 0) {
    const array = reviews.map(item => Number(item.score));
    averageScore = Math.round( array.reduce((a, b) => a + b) / array.length *10 ) / 10;
  };

  let commentBox = false;
  if (reviews.filter(review => review.reviewBody !== "").length > 0) {
    commentBox = true;
  };

  const { user } = useContext(AuthContext);
  const [addReview] = useMutation(AddReview);

  const { innerWidth } = window;
  const isMobile = ( innerWidth < 576 ) ? true : false;

  function handleReviewChange(e) {
    const { value } = e.target;
    setReviewBody(value);
  };

  function handleSubmitClick() {
    const returnedPromise = addReview({
      variables: {
        userId: user ? user.id : "60648735758b5ea1b880cdf9",
        productId,
        score: (rating !== 0) ? rating.toString() : "",
        reviewBody
      },
      refetchQueries: [
        {query: GetProductReviews, variables: { id: productId }},
        {query: GetProductQuery, variables: { id: productId }},
      ]
    });
    returnedPromise.then(result => {
      setReviewBody("");
      setRating(0);
    }).catch(err => {
      appointError(err.message)
    });
  };

  return (
    <div id="productReviews" className="d-flex flex-column">
      <h5 className="card-title p-3">Review Score: {averageScore} <i className="bi bi-star-fill"></i>
        <span className="text-muted text-lowercase"> over {reviews.length} reviews</span>
      </h5>
      <div className="position-relative">
        <div id="displayReviewsContainer">
          { commentBox ? <DisplayReviews productId={productId} /> : <p>Be first to write a comment...</p> }
        </div>
        { !isMobile && commentBox && <HorizontalScrollButton targetContainer="displayReviewsContainer"/> }
      </div>
      <div>
        <textarea className="form-control mb-1" rows="2" value={reviewBody} onChange={handleReviewChange} placeholder="Add a comment..." />
        <div className="d-flex align-items-end">
          <StarRating rating={rating} setRating={setRating} />
          <p className="my-0 mx-3">Rating: {rating}/5</p>
          <button className="ms-auto py-1 px-3 btn btn-primary" onClick={handleSubmitClick}>Submit</button>
        </div>
      </div>
    </div>
  )
};

export default ProductReviews;
