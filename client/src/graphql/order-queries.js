import { gql } from '@apollo/client';

const GetOrders = gql`
  query {
    orders {
      id
      productName
      productSize
      productPrice
      createdAt
      deliveryMethod
      deliveryAddress
      userId
      status
      deliveredAt
    }
  }
`;

export { GetOrders };
