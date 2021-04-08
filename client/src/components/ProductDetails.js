import React from "react";
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { GetProductQuery } from '../graphql/queries';
import ProductCard from "./ProductCard";

function ProductDetails({ addItemToCart }) {

  const { id } = useParams();

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

  function handleAddToCartClick() {
    addItemToCart({
      id: data.product.id,
      name: data.product.name,
      description: data.product.description,
      size: "M",
      price: data.product.price,
      imageLink: data.product.imageLink
    });
  };

  return (
    <div className="container pb-3">
      <div className="row">
        <div className="col-md-6 py-3">
          <div className="productImg"><img className="w-100" src={data.product.imageLink} alt={data.product.description} /></div>
        </div>
        <div className="col-md-6">
          <div className="py-3">
            <div className="d-flex justify-content-between">
              <div>
                <h5>{data.product.name}</h5>
                <p>{data.product.description}</p>
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
            <button type="button" className="btn btn-primary w-100" onClick={handleAddToCartClick}>Add to Cart</button>
          </div>
        </div>
      </div>

      <div className="reviewBox">
        <h5 className="card-title p-3">Review</h5>

      </div>

      <div className="similarProductsBox">
        <h5 className="card-title p-3">Similar Products</h5>
        <div className="d-flex justify-content-between">
          {data.product.category.products.filter(item => (item.id !== data.product.id)).map(item => {
            return <ProductCard key={item.id} item={item} />
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
