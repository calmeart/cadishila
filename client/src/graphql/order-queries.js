import { gql } from '@apollo/client';

const GetOrders = gql`
  query {
    orders {
      id
      cartContent {
        productDetails {
          id
          name
          description
          price
          imageLink
        },
        size,
        count
      }
      customerDetails {
        username
        email
        phone
      }
      deliveryDetails {
        city
        district
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

const GetUserOrders = gql`
  query ( $email: String! ) {
    getUserOrders ( email: $email ) {
      id
      cartContent {
        productDetails {
          id
          name
          description
          price
          imageLink
        },
        size,
        count
      }
      customerDetails {
        username
        email
        phone
      }
      deliveryDetails {
        city
        district
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

const SubmitOrder = gql`
  mutation ($cartContentInput: [CartContentInput!], $customerDetails: CustomerDetailsInput!, $deliveryDetails: DeliveryDetailsInput!) {
    submitOrder(cartContentInput: $cartContentInput, customerDetails: $customerDetails, deliveryDetails: $deliveryDetails) {
      id
      cartContent {
        productDetails {
          id
          name
          description
          price
          imageLink
        },
        size,
        count
      }
      customerDetails {
        username
        email
        phone
      }
      deliveryDetails {
        city
        district
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

export { GetOrders, GetUserOrders, SubmitOrder };
