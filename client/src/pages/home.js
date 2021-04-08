import React, { useState } from "react";

import shilaProfile from "../images/shila-profile-circle.png";
import witchHat from "../images/witch-hat.jpg";

import ProductList from "../components/ProductList";

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
    </div>
  )
}

export default Home;
