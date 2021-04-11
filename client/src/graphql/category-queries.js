import { gql } from '@apollo/client';

const CategoryMutation = gql`
  mutation ($name: String!, $audience: String!) {
    addCategory(name: $name, audience: $audience) {
      id
      name
      audience
    }
  }
`;

const GetCategoriesQuery = gql`
  query {
    categories {
      id
      name
      audience
      products {
        id
        name
      }
    }
  }
`;

export { CategoryMutation, GetCategoriesQuery };
