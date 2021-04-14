import React, { useContext, useState } from "react";

import ProductCard from "../components/ProductCard";
import { AuthContext } from "../context/auth";

function Payment({ cartContent }) {

    let totalPrice = 0;

    if (cartContent.length > 0) {
      function reducer(acc, cur) {
        const curPrice = (Number(cur.productDetails.price) * cur.count);
        return acc + curPrice;
      }
      totalPrice = cartContent.reduce(reducer, 0);
    }

    const { user } = useContext(AuthContext);

    const [userDetails, setUserDetails] = useState({
      username: user ? user.username : "",
      email: user ? user.email : "",
      phone: ""
    })

    const [deliveryDetails, setDeliveryDetails] = useState({
      city: "",
      neighborhood: "",
      addressOne: "",
      addressTwo: "",
      zipCode: ""
    });

    function handleUserChange(e) {
      const { name, value } = e.target;
      setUserDetails(prev => ({
        ...prev,
        [name]: value
      }))
    };

    function handleDeliveryChange(e) {
      const { name, value } = e.target;
      setDeliveryDetails(prev => ({
        ...prev,
        [name]: value
      }))
    }

    return (
      <div id="payment">
        <div className="row">
          <div className="col-md-6">
            <div className="container">
              <h2 className="text-center">Contact Info</h2>
              <h5>Personal Information</h5>
              <div className="row">
                <div className="col-md-12">
                  <input type="text" className="form-control mb-3" name="username" value={userDetails.username} onChange={handleUserChange} placeholder="Name Surname" />
                </div>
                <div className="col-md-6">
                  <input type="email" className="form-control mb-3" name="email" value={userDetails.email} onChange={handleUserChange} placeholder="Contact Mail" />
                </div>
                <div className="col-md-6">
                  <input type="text" className="form-control mb-3" name="phone" value={userDetails.phone} onChange={handleUserChange} placeholder="Phone Number" />
                </div>

              </div>
              <h5>Delivery Details</h5>
              <div className="row">
                <div className="col-md-6">
                  <input type="text" className="form-control mb-3" name="city" value={deliveryDetails.city} onChange={handleDeliveryChange} placeholder="City" />
                </div>
                <div className="col-md-6">
                  <input type="text" className="form-control mb-3" name="neighborhood" value={deliveryDetails.neighborhood} onChange={handleDeliveryChange} placeholder="Neighborhood" />
                </div>
                <div className="col-md-12">
                  <input type="text" className="form-control mb-3" name="addressOne" value={deliveryDetails.addressOne} onChange={handleDeliveryChange} placeholder="Address Line 1" />
                  <input type="text" className="form-control mb-3" name="addressTwo" value={deliveryDetails.addressTwo} onChange={handleDeliveryChange} placeholder="Address Line 2" />
                  <input type="text" className="form-control mb-3" name="zipCode" value={deliveryDetails.zipCode} onChange={handleDeliveryChange} placeholder="Zip Code" />
                </div>
              </div>
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
