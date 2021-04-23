import React, { useContext, useEffect, useState } from "react";
import { useMutation } from '@apollo/client';

import { AuthContext } from "../context/auth";
import { SubmitOrder } from "../graphql/order-queries";

function Payment({ appointError, cartContent, setCartContent }) {

    useEffect(() => {
      const cartContainer = document.getElementById('collapseExample');
      cartContainer.classList.remove('show');
    }, []);

    let totalPrice = 0;

    if (cartContent.length > 0) {
      function reducer(acc, cur) {
        const curPrice = (Number(cur.productDetails.price) * cur.count);
        return acc + curPrice;
      }
      totalPrice = cartContent.reduce(reducer, 0);
    }

    const { user } = useContext(AuthContext);
    const [submitOrder] = useMutation(SubmitOrder);

    const [customerDetails, setCustomerDetails] = useState({
      username: user ? user.username : "",
      email: user ? user.email : "",
      phone: ""
    })

    const [deliveryDetails, setDeliveryDetails] = useState({
      city: "",
      district: "",
      addressOne: "",
      addressTwo: "",
      zipCode: ""
    });

    function handleUserChange(e) {
      const { name, value } = e.target;
      setCustomerDetails(prev => ({
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

    function hanldleSubmitOrder(e) {
      e.preventDefault();
      const cartContentInput = cartContent.map(cartItem => ({
        productDetails: cartItem.productDetails,
        size: cartItem.size,
        count: cartItem.count
      }));
      const returnedPromise = submitOrder({
        variables: {
          cartContentInput,
          deliveryDetails,
          customerDetails
        }
      });
      returnedPromise.then(result => {
        appointError('Your order has been received. You can view your orders from your profile, IF YOU HAVE ONE!!!!!');
        setDeliveryDetails({
          city: "",
          district: "",
          addressOne: "",
          addressTwo: "",
          zipCode: ""
        });
        setCartContent([]);
      }).catch(err => {
        appointError(err.message);
      })
    }

    return (
      <div id="payment">
        <div className="container">
          <h2 className="text-center m-3">Delivery Info</h2>
          <div className="row g-5">

            <div className="col-md-5 col-lg-4 order-md-last">
              <h5 className="d-flex justify-content-between align-items-center mb-3">
                Your Cart
                <span className="badge bg-secondary rounded-pill">{cartContent.length}</span>
              </h5>
              <ul className="list-group mb-3">
                {cartContent.map(item =>
                  <li key={item.cartId} className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0">{item.count} {item.productDetails.name}</h6>
                      <small className="text-muted">Size: {item.size[0].toUpperCase()} </small>
                    </div>
                    <span className="text-muted">₺{Number(item.productDetails.price) * item.count}</span>
                  </li>
                )}
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (TRY)</span>
                  <strong>₺{totalPrice}</strong>
                </li>
              </ul>

              <form className="card p-2">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Promo code" disabled />
                  <button type="submit" className="btn btn-secondary disabled">Redeem</button>
                </div>
              </form>
            </div>

            <div className="col-md-7 col-lg-8">
              <h5>Personal Details</h5>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">First name</label>
                  <input type="text" className="form-control" id="firstName" disabled />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">Last name</label>
                  <input type="text" className="form-control" id="lastName" disabled />
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" name="email" value={customerDetails.email} onChange={handleUserChange} placeholder="you@example.com" />
                </div>

                <div className="col-sm-6">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" className="form-control" id="username" name="username" value={customerDetails.username} onChange={handleUserChange} placeholder="Username" required />
                </div>

                <div className="col-sm-6">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input type="text" className="form-control" id="phone" name="phone" value={customerDetails.phone} onChange={handleUserChange} placeholder="+90 (XXX) XX XX" />
                </div>

                <hr className="my-4" />

                <h5>Address Details</h5>

                <div className="col-12">
                  <label htmlFor="addressOne" className="form-label">Address</label>
                  <input type="text" className="form-control" id="addressOne" name="addressOne" value={deliveryDetails.addressOne} onChange={handleDeliveryChange} placeholder="Street and compound" required />
                </div>

                <div className="col-12">
                  <label htmlFor="addressTwo" className="form-label">Address 2</label>
                  <input type="text" className="form-control" id="addressTwo" name="addressTwo" value={deliveryDetails.addressTwo} onChange={handleDeliveryChange} placeholder="Apartment or suite" />
                </div>

                <div className="col-md-5">
                  <label htmlFor="city" className="form-label">City</label>
                  <input type="text" className="form-control" id="city" name="city" value={deliveryDetails.city} onChange={handleDeliveryChange} placeholder="City" />
                </div>

                <div className="col-md-4">
                  <label htmlFor="district" className="form-label">District</label>
                  <input type="text" className="form-control" id="distrit" name="district" value={deliveryDetails.district} onChange={handleDeliveryChange} placeholder="District" />
                </div>

                <div className="col-md-3">
                  <label htmlFor="zipCode" className="form-label">Zip</label>
                  <input type="text" className="form-control" id="zipCode" name="zipCode" value={deliveryDetails.zipCode} onChange={handleDeliveryChange} placeholder="06000" required />
                </div>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <div className="text-center">
            <h2>Approve Order</h2>
          <button className="btn btn-primary" onClick={hanldleSubmitOrder}>Submit Order</button>
          </div>
        </div>
      </div>
    )
}

export default Payment;
