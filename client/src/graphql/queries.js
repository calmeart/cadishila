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
        description
        price
        imageLink

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
    category {
      id
      name
      audience
    }
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

const DeleteProductMutation = gql`
  mutation ($id: ID!) {
    deleteProduct(id: $id) {
      id
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

const EditProductMutation = gql`
  mutation ($id: ID!, $name: String!, $description: String!, $price: String!, $size: [String!], $categoryId: String!, $imageLink: String!) {
    addProduct(id: $id, name: $name, description: $description, price: $price, size: $size, categoryId: $categoryId, imageLink: $imageLink) {
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

const LoginUser = gql`
  mutation ($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      username
      email
      isAdmin
      token
    }
  }
`

const RegisterUser = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      id
      username
      email
      isAdmin
      token
    }
  }
`


export {GetProductQuery, GetProductsQuery, GetCategoriesQuery, CategoryMutation, ProductMutation, DeleteProductMutation, LoginUser, RegisterUser};
