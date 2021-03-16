import React, {Component} from "react";
import { gql, useQuery } from '@apollo/client';

const GetProductsQuery = gql`
query {
  products {
    id
    name
    description
    price
  }
}
`;

function DisplayProducts() {
  const { loading, error, data } = useQuery(GetProductsQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.products.map(item => (
    <div className="card" style={{width: "18rem", margin: "1rem"}} key={item.id}>
      <div style={{width: "100%", height: "10rem", backgroundColor: "gray"}}>This will be an image</div>
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.description}</p>
        <p className="card-text">TRY {item.price}</p>
      </div>
    </div>
  ));
}


class ProductList extends Component {
  render() {
    return (
      <div className="d-flex" id="products">
        <DisplayProducts />
      </div>
    )
  }
}

export default ProductList;
