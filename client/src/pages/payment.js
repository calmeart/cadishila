import React from "react";

import ProductCard from "../components/ProductCard";

function Payment({ cartContent }) {

    return (
      <div id="payment">
        <div>
          {cartContent.map(item => <ProductCard key={item.productDetails.id} item={item.productDetails} />)}
        </div>
        <div>
        </div>
        <div>
        </div>
      </div>
    )
}

export default Payment;
