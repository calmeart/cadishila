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

const SubmitOrder = gql`
  mutation ($cartContent: [CartContentInput!], $customerDetails: CustomerDetailsInput!, $deliveryDetails: DeliveryDetailsInput!) {
    submitOrder(cartContent: $cartContent, customerDetails: $customerDetails, deliveryDetails: $deliveryDetails) {
      id
      cartContent {
        productDetails {
          id
          name
          description
          price
          size
          imageLink
        },
        count
      }
      customerDetails {
        username
        email
        phone
      }
      deliveryDetails {
        city
        neighborhood
        addressOne
        addressTwo
        zipCode
      }
      createdAt
      status
      deliveredAt
    }
  }
`;

export { GetOrders, SubmitOrder };
