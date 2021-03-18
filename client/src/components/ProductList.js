import React, {Component} from "react";
import { gql, useQuery } from '@apollo/client';
import { GetProductsQuery } from '../graphql/queries';

function DisplayProducts({ selectProduct }) {
  const { loading, error, data } = useQuery(GetProductsQuery);

  if (loading) return <p className="errorMessage">Loading...</p>;
  if (error) return <p className="errorMessage">Error :(</p>;

  return data.products.map(item => (
    <div className="card" key={item.id}>
      <div className="cardImg">This will be an image</div>
      <div className="card-body">
        <h5 className="card-title" >{item.name}</h5>
        <button className="btn bg-transparent stretched-link" value={item.id} onClick={selectProduct}><p className="card-text">TRY {item.price}</p></button>
      </div>
    </div>
  ));
}


class ProductList extends Component {
  render() {
    return (
      <div id="products">
        <DisplayProducts selectProduct={this.props.selectProduct}/>
      </div>
    )
  }
}

export default ProductList;
