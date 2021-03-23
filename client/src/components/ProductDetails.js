import React, {Component} from "react";
import { useQuery } from '@apollo/client';
import { GetProductQuery } from '../graphql/queries';

function DisplayProductDetails({ id }) {
  const { loading, error, data } = useQuery(GetProductQuery, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>;

  if (error) {
    if (error.message === 'Cast to ObjectId failed for value "" at path "_id" for model "Product"') {
      return <p className="errorMessage">No Products Selected</p>
    } else {
    return <p className="errorMessage">Error: {error.message}</p>;
    }
  }

  return (
    <div className="card" key={data.product.id}>
      <div className="cardImg">This will be an image</div>
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
      <div id="productDetailsBox">
        <DisplayProductDetails id={this.props.id}/>
      </div>
    )
  }
}

export default ProductDetails;
