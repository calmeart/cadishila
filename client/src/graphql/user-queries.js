import { gql } from '@apollo/client';

const GetUsers = gql`
  query {
    users {
      id
      username
      email
      isAdmin
    }
  }
`;

export { GetUsers };
