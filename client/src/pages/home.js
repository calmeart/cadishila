import React, { useState } from "react";

import ProductList from "../components/ProductList";
import AddProduct from "../components/AddProduct";
import AddCategory from "../components/AddCategory";
import ProductDetails from "../components/ProductDetails";
import ErrorToast from "../components/ErrorToast";

function Home() {

  const [productId, setProductId] = useState("");
  const [errors, setErrors] = useState({
    errorMessage: "",
    errorState: false
  });

  function selectProduct(e) {
    e.preventDefault();
    setProductId(e.target.value);
  };

  function appointError(errMessage) {
    setErrors({
      errorMessage: errMessage,
      errorState: true
    });
  };

  function dismissError() {
    setErrors({
      errorMessage: "",
      errorState: false
    });
  };

  return (
    <div>
      <ProductList selectProduct={selectProduct}/>
      <ProductDetails id={productId} selectProduct={selectProduct} />
      <div id="addProductBox">
        <AddProduct appointError={appointError}  />
      </div>
      <div id="addCategoryBox">
        <AddCategory appointError={appointError} />
      </div>
      {errors.errorState && (<ErrorToast errorMessage={errors.errorMessage} dismissError={dismissError} />)}
    </div>
  )

}

export default Home;
