import React, {Component} from "react";
import { gql, useQuery } from '@apollo/client';

const GetProductQuery = gql`
query ($id: ID!) {
  product(id: $id) {
    id
    name
    description
    price
    size
    category {
      id
      name
      class
      products {
        id
        name
      }
    }
  }
}
`;

function DisplayProductDetails({ id }) {
  const { loading, error, data } = useQuery(GetProductQuery, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>;

  if (error) {
    if (error.message === 'Cast to ObjectId failed for value "" at path "_id" for model "Product"') {
      return <p>No Products Selected</p>
    } else {
    return <p>Error: {error.message}</p>;
    }
  }

  return (
    <div className="card" style={{width: "18rem", margin: "1rem"}} key={data.product.id}>
      <div style={{width: "100%", height: "10rem", backgroundColor: "gray"}}>This will be an image</div>
      <div className="card-body">
        <h5 className="card-title">{data.product.name}</h5>
        <p className="card-text">{data.product.description}</p>
        <p className="card-text">{data.product.size}</p>
        <p className="card-text">TRY {data.product.price}</p>
      </div>
      <div className="card-body">
        <ul>
        {data.product.category.products.map(item => {
          return <li key={item.id}>{item.name}</li>
        })}
        </ul>
      </div>
    </div>
  );
}

class ProductDetails extends Component {
  render() {
    return (
      <div>
        <DisplayProductDetails id={this.props.id}/>
      </div>
    )
  }
}

export default ProductDetails;
