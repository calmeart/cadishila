import React, { useState } from "react";
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';

import { GetProductQuery } from '../graphql/queries';
import ProductCard from "./ProductCard";
import CenteredSpinner from "../utils/CenteredSpinner";
import validateSize from "../utils/validateSize";

function ProductDetails({ addItemToCart, appointError }) {

  const designatedSizes = {
    xs: ["28", "26", "41"],
    s: ["35", "30", "53"],
    m: ["48", "40", "68"],
    l: ["59", "53", "83"],
    xl: ["73", "60", "91"],
    custom: ["", "", ""]
  };

  const [size, setSize] = useState({
    name: "",
    neck: "",
    chest: "",
    length: ""
  });

  function handleSizeClick(e) {
    const { name } = e.target;
    const buttons = document.getElementsByClassName("btn-outline-primary");
    const clicked = document.getElementById(`button${name}`);
    Array.from(buttons).forEach(button => button.classList.remove("active"));
    clicked.classList.add("active");
    setSize({
      name,
      neck: designatedSizes[name][0],
      chest: designatedSizes[name][1],
      length: designatedSizes[name][2]
    });
  }

  function handleSizeChange(e) {
    const { name, value } = e.target;
    const buttons = document.getElementsByClassName("btn-outline-primary");
    const customButton = document.getElementById("buttoncustom");
    Array.from(buttons).forEach(button => button.classList.remove("active"));
    customButton.classList.add("active");
    setSize(prev => ({
      ...prev,
      [name]: value,
      name: "custom"
    }))
  };

  const { id } = useParams();

  const { loading, error, data } = useQuery(GetProductQuery, {
    variables: { id }
  });

  if (loading) return <CenteredSpinner />;

  if (error) {
    if (error.message === 'Cast to ObjectId failed for value "" at path "_id" for model "Product"') {
      return <p className="errorMessage">No Products Selected</p>
    } else {
    return <p className="errorMessage">Error: {error.message}</p>;
    }
  }

  const isPet = data.product.category.audience === "Pet" ? true : false;

  function handleAddToCartClick() {
    let sizeArray = Object.values(size);
    const isValidSize = validateSize(sizeArray);
    if (!isValidSize.state) {
      return appointError(isValidSize.message);
    }
    if (!isPet) {
      sizeArray = sizeArray.slice(0, 1);
    }
    addItemToCart({
      id: data.product.id,
      name: data.product.name,
      description: data.product.description,
      size: sizeArray,
      price: data.product.price,
      imageLink: data.product.imageLink
    });
  };

  return (
    <div id="productDetails" className="container pb-3">
      <div className="row">
        <div className="col-md-6 py-3">
          <div className="productImg w-100"><img src={data.product.imageLink} alt={data.product.description} /></div>
        </div>
        <div className="col-md-6">
          <div className="py-3">
            <div className="d-flex justify-content-between">
              <div>
                <h5>{data.product.name}</h5>
                <p>{data.product.description}</p>
              </div>
            </div>
            <table className="table table-borderless table-sm w-auto">
              <tbody>
                <tr>
                  <th scope="row">Price: </th>
                  <td><p className="card-text">TRY {data.product.price}</p></td>
                </tr>
              </tbody>
            </table>

            <div className="sizeBox d-flex flex-column mb-3">
              <p className="fw-bold">Select Size (in centimeters): </p>
              { isPet && <p className="fw-light">If you don't know your sizes please read our measurement guide.</p> }
              <div className="sizeButtons d-flex justify-content-between mb-3">
                <button type="button" id="buttonxs" className="btn btn-outline-primary" name="xs" onClick={handleSizeClick}>XS</button>
                <button type="button" id="buttons" className="btn btn-outline-primary" name="s" onClick={handleSizeClick}>S</button>
                <button type="button" id="buttonm" className="btn btn-outline-primary" name="m" onClick={handleSizeClick}>M</button>
                <button type="button" id="buttonl" className="btn btn-outline-primary" name="l" onClick={handleSizeClick}>L</button>
                <button type="button" id="buttonxl" className="btn btn-outline-primary" name="xl" onClick={handleSizeClick}>XL</button>
                { isPet && <button type="button" id="buttoncustom" className="btn btn-outline-primary" name="custom" onClick={handleSizeClick}>Custom</button> }
              </div>
              { isPet && (
              <div className="sizeInputs">
                <div className="row g-3 align-items-center">
                  <div className="col-2">
                    <label htmlFor="inputNeck" className="col-form-label">Neck: </label>
                  </div>
                  <div className="col-auto">
                    <input type="text" id="inputNeck" className="form-control" name="neck" value={size.neck} onChange={handleSizeChange} />
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-2">
                    <label htmlFor="inputChest" className="col-form-label">Chest: </label>
                  </div>
                  <div className="col-auto">
                    <input type="text" id="inputChest" className="form-control" name="chest" value={size.chest} onChange={handleSizeChange} />
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-2">
                    <label htmlFor="inputLength" className="col-form-label">Length: </label>
                  </div>
                  <div className="col-auto">
                    <input type="text" id="inputLength" className="form-control" name="length" value={size.length} onChange={handleSizeChange} />
                  </div>
                </div>
              </div> )}
            </div>

            <button type="button" className="btn btn-primary w-100" onClick={handleAddToCartClick}>Add to Cart</button>
          </div>
        </div>
      </div>

      <div className="reviewBox">
        <h5 className="card-title p-3">Review</h5>

      </div>

      <div className="similarProductsBox">
        <h5 className="card-title p-3">Similar Products</h5>
        <div className="row flex-nowrap overflow-auto mx-0">
          {data.product.category.products.filter(item => (item.id !== data.product.id)).map(item => {
            return <ProductCard key={item.id} item={item} />
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
