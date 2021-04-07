import React, { useState } from "react";

import shilaProfile from "../images/shila-profile-circle.png";
import witchHat from "../images/witch-hat.jpg";

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
    <div className="position-relative">
        <div className="headerButtons position-absolute start-50 top-0 translate-middle">
          <img className="headerImage" src={witchHat} name="Human" onClick={handleAudienceClick} alt="Which hat" />
          <img className="headerImage" src={shilaProfile} name="Pet" onClick={handleAudienceClick} alt="Shila Profile" />
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

// <div class="temp-header">
//   <svg viewBox="0 0 550 220">
//     <path id="curve" fill="transparent" d="M1,173 q268,-96 498,1" />
//     <text width="500">
//       <textPath xlink:href="#curve">
//         CadiShila
//       </textPath>
//     </text>
//   </svg>
//   <div class="temp-image">
//     <img class="temp-title-image" src="images/witch-hat.jpg" alt="white maltese terrier profile">
//     <img class="temp-title-image" src="images/shila-profile-circle.png" alt="white maltese terrier profile">
//   </div>
// </div>
