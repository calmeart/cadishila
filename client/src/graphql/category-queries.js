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
      createdAt
      products {
        id
        name
      }
    }
  }
`;

const DeleteCategory = gql`
  mutation ($id: ID!) {
    deleteCategory(id: $id) {
      id
      name
      audience
    }
  }
`;

export { CategoryMutation, DeleteCategory, GetCategoriesQuery };
