import React from "react";

import ProductCard from "../components/ProductCard";

function Payment({ cartContent }) {

    let totalPrice = 0;

    if (cartContent.length > 0) {
      function reducer(acc, cur) {
        const curPrice = (Number(cur.productDetails.price) * cur.count);
        return acc + curPrice;
      }
      totalPrice = cartContent.reduce(reducer, 0);
    }

    return (
      <div id="payment">
        <div className="row">
          <div className="col-md-6">
            <div className="container">
              <h2 className="text-center">Contact Info</h2>
              <h5>Personal Information</h5>
              <input type="text" className="form-control mb-3" name="fname" placeholder="First Name" />
              <input type="text" className="form-control mb-3" name="lname" placeholder="Last Name" />
              <input type="text" className="form-control mb-3" name="phone" placeholder="Phone Number" />
              <input type="email" className="form-control mb-3" name="email" placeholder="Contact Mail" />

              <h5>Delivery Details</h5>
              <input type="text" className="form-control mb-3" name="city" placeholder="City" />
              <input type="text" className="form-control mb-3" name="neighborhood" placeholder="Neighborhood" />
              <input type="text" className="form-control mb-3" name="addressLineOne" placeholder="Address Line 1" />
              <input type="text" className="form-control mb-3" name="addressLineTwo" placeholder="Address Line 2" />
            </div>
          </div>
          <div className="col-md-6 text-center">
            <h2>Your Products</h2>
            <div>
              {cartContent.map(item =>
                <div className="d-flex justify-content-around align-items-center">
                  <ProductCard key={item.productDetails.id} item={item.productDetails} />
                  <h2>X</h2>
                  <h2>{item.count}</h2>
                  <h2>=</h2>
                  <h2>TRY {Number(item.productDetails.price) * item.count}</h2>
                </div>
                )}
            </div>
            <h2>TOTAL PRICE = TRY {totalPrice}</h2>
          </div>
        </div>


        <div className="text-center">
          <h2>Approve Order</h2>
          <button className="btn btn-primary">Submit Order</button>
        </div>
      </div>
    )
}

export default Payment;
