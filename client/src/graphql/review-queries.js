import { gql } from '@apollo/client';

const GetReviews = gql`
  query {
    reviews {
      id
      user {
        id
        username
        email
      }
      product {
        id
        name
        imageLink
      }
      reviewBody
      score
      createdAt
    }
  }
`;

const GetUserReviews = gql`
  query ($id: ID!) {
    userReviews (id: $id) {
      id
      product {
        id
        name
        imageLink
      }
      reviewBody
      score
      createdAt
    }
  }
`;

const GetProductReviews = gql`
  query ($id: ID!) {
    productReviews (id: $id) {
      id
      user {
        id
        username
      }
      reviewBody
      score
      createdAt
    }
  }
`;

const AddReviews = gql`
  mutation ($userId: ID!, $productId: ID!, $score: String!, $reviewBody: String!) {
    productReviews (userId: $userId, productId: $productId, score: $score, reviewBody: $reviewBody ) {
      id
      user {
        id
        username
      }
      reviewBody
      score
      createdAt
    }
  }
`;

export { AddReviews, GetReviews, GetProductReviews, GetUserReviews };
