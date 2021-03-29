import React, {Component} from "react";
import { useQuery } from '@apollo/client';
import { GetProductsQuery } from '../graphql/queries';
import ProductCard from "./ProductCard";

function DisplayProducts({ selectProduct }) {
  const { loading, error, data } = useQuery(GetProductsQuery);

  if (loading) return <p className="errorMessage">Loading...</p>;
  if (error) return <p className="errorMessage">Error :(</p>;

  return data.products.map(item => <ProductCard key={item.id} item={item} selectProduct={selectProduct} />
  );
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
