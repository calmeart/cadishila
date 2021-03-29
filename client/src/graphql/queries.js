import { gql } from '@apollo/client';

const GetProductQuery = gql`
query ($id: ID!) {
  product(id: $id) {
    id
    name
    description
    price
    size
    imageLink
    category {
      id
      name
      audience
      products {
        id
        name
        price
      }
    }
  }
}
`;

const GetProductsQuery = gql`
query {
  products {
    id
    name
    description
    price
    imageLink
  }
}
`;

const GetCategoriesQuery = gql`
  query ($audience: String!) {
    categories(audience: $audience) {
      id
      name
    }
  }
`;

const CategoryMutation = gql`
  mutation ($name: String!, $audience: String!) {
    addCategory(name: $name, audience: $audience) {
      id
      name
      audience
    }
  }
`;

const ProductMutation = gql`
  mutation ($name: String!, $description: String!, $price: String!, $size: [String!], $categoryId: String!, $imageLink: String!) {
    addProduct(name: $name, description: $description, price: $price, size: $size, categoryId: $categoryId, imageLink: $imageLink) {
      id
      name
      price
      category {
        id
        name
        audience
      }
    }
  }
`;


export {GetProductQuery, GetProductsQuery, GetCategoriesQuery, CategoryMutation, ProductMutation};
