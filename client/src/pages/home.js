import React, { useState } from "react";

import ProductList from "../components/ProductList";
import AddProduct from "../components/AddProduct";
import AddCategory from "../components/AddCategory";
import ProductDetails from "../components/ProductDetails";

function Home(props) {
  const [audience, setAudience] = useState("Human");

  function handleAudienceClick(e) {
    const { name } = e.target
    setAudience(name);
  };

  return (
    <div>
      <div id="header" className="text-center">
        <h1>CadiShila</h1>
        <button className="btn btn-primary mx-5" name="Human" onClick={handleAudienceClick}>Human</button>
        <button className="btn btn-primary mx-5" name="Pet" onClick={handleAudienceClick}>Pet</button>
      </div>
      <ProductList audience={audience}/>
      {
      //   <ProductDetails id={productId} selectProduct={selectProduct} />
      // <div id="addProductBox">
      //   <AddProduct appointError={props.appointError}  />
      // </div>
      // <div id="addCategoryBox">
      //   <AddCategory appointError={props.appointError} />
      // </div>
    }

    </div>
  )

}

export default Home;
