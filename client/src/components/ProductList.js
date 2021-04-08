import React, {Component} from "react";
import { useQuery } from '@apollo/client';
import { GetProductsQuery } from '../graphql/queries';
import ProductCard from "./ProductCard";

function DisplayProducts({ audience, selectProduct }) {
  const { loading, error, data } = useQuery(GetProductsQuery);

  if (loading) return <p className="errorMessage">Loading...</p>;
  if (error) return <p className="errorMessage">Error :(</p>;

  return data.products.filter(item => item.category.audience === audience).map(item => <ProductCard key={item.id} item={item} />
  );
}

class ProductList extends Component {
  render() {
    return (
      <div id="products" className="container p-3 d-flex justify-content-between">
        <DisplayProducts audience={this.props.audience}/>
      </div>
    )
  }
}

export default ProductList;
