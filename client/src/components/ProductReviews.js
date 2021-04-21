import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { AddReview, GetProductReviews } from "../graphql/review-queries";
import { AuthContext } from "../context/auth";
import ReviewCard from "./ReviewCard";
import StarRating from "../utils/StarRating";
import HorizontalScrollButton from "../utils/HorizontalScrollButton";

function DisplayReviews({ productId, setAverageRating, setNumberOfReviews }) {
  const { loading, error, data } = useQuery(GetProductReviews, {
    variables: {
      id: productId
    }
  });

  if (loading) return <p className="errorMessage">Loading...</p>;
  if (error) return <p className="errorMessage">Error: {error.message}</p>;

  const arrayOfRates = data.productReviews.map(review => Number(review.score));
  const avg = Math.round(arrayOfRates.reduce((a, b) => a + b) / arrayOfRates.length *10) / 10;
  setAverageRating(avg);
  setNumberOfReviews(arrayOfRates.length);


  return data.productReviews.filter(review => review.reviewBody !== "").map(review => <ReviewCard key={review.id} review={review} /> );
};

function ProductReviews({productId, appointError}) {
  const [ reviewBody, setReviewBody ] = useState("");
  const [ rating, setRating ] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [numberOfReviews, setNumberOfReviews] = useState(0);

  const { user } = useContext(AuthContext);
  const [addReview] = useMutation(AddReview);

  const { innerWidth } = window;
  const isMobile = ( innerWidth < 576 ) ? true : false;

  function handleReviewChange(e) {
    const { value } = e.target;
    setReviewBody(value);
  };

  function handleSubmitClick() {
    console.log(rating);
    const returnedPromise = addReview({
      variables: {
        userId: user.id,
        productId,
        score: (rating !== 0) ? rating.toString() : "",
        reviewBody
      },
      refetchQueries: [{query: GetProductReviews, variables: { id: productId }}]
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
      <h5 className="card-title p-3">Review Score: {averageRating} <i className="bi bi-star-fill"></i>
        <span className="text-muted text-lowercase"> over {numberOfReviews} reviews</span>
      </h5>
      <div className="position-relative">
        <div id="displayReviewsContainer">
          <DisplayReviews key={numberOfReviews} productId={productId} setAverageRating={setAverageRating} setNumberOfReviews={setNumberOfReviews} />
        </div>
        {!isMobile && <HorizontalScrollButton targetContainer="displayReviewsContainer"/>}
      </div>
      <div>
        <textarea className="form-control mb-1" rows="2" value={reviewBody} onChange={handleReviewChange} placeholder="Add review..." />
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
