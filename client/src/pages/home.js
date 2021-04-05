import React, { useState } from "react";

import ProductList from "../components/ProductList";
import AddProduct from "../components/AddProduct";
import AddCategory from "../components/AddCategory";
import ProductDetails from "../components/ProductDetails";

function Home(props) {
  const [productId, setProductId] = useState("");

  function selectProduct(e) {
    e.preventDefault();
    setProductId(e.target.value);
  };

  return (
    <div>
      <ProductList selectProduct={selectProduct}/>
      <ProductDetails id={productId} selectProduct={selectProduct} />
      <div id="addProductBox">
        <AddProduct appointError={props.appointError}  />
      </div>
      <div id="addCategoryBox">
        <AddCategory appointError={props.appointError} />
      </div>

    </div>
  )

}

export default Home;
