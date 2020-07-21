import React from 'react';
import ReviewsEntry from './ReviewsEntry.jsx';

const Reviews = (props) => (
  <tbody>
    {props.reviews.slice(0, 6).map((review, i) => (
      <ReviewsEntry review={review} key={i} />
    ))}
  </tbody>
);

export default Reviews;
