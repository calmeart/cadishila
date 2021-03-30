import React, {Component} from "react";
import { useQuery } from '@apollo/client';
import { GetProductQuery } from '../graphql/queries';
import ProductCard from "./ProductCard";
import DeleteButton from "./deleteButton";

function DisplayProductDetails({ id, selectProduct }) {
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
    <div className="productContainer">
      <div className="productImg"><img src={data.product.imageLink} alt={data.product.description} /></div>
      <div className="p-3">
        <div className="d-flex justify-content-between">
          <div>
            <h5>{data.product.name}</h5>
            <p>{data.product.description}</p>
          </div>
          <div>
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Delete
            </button>
          </div>
        </div>
        <table className="table table-borderless table-sm">
          <tbody>
            <tr>
              <th scope="row">Available Size: </th>
              <td><p className="card-text">{data.product.size.join(" - ")}</p></td>
            </tr>
            <tr>
              <th scope="row">Price: </th>
              <td><p className="card-text">TRY {data.product.price}</p></td>
            </tr>
          </tbody>
        </table>
        <button type="button" className="btn btn-primary disabled w-100">Order Product</button>
      </div>
      <div className="p-3">
        <h5 className="card-title">Similar Products</h5>
        <div className="d-flex">
          {data.product.category.products.map(item => {
            return <ProductCard key={item.id} item={item} selectProduct={selectProduct} />
          })}
        </div>
      </div>
    </div>
  );
}

class ProductDetails extends Component {
  render() {
    return (
      <div>
        <div id="productDetailsBox">
          <DisplayProductDetails id={this.props.id} selectProduct={this.props.selectProduct}/>
        </div>
        <DeleteButton />
      </div>
    )
  }
}

export default ProductDetails;
