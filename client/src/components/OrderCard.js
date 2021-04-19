import React from 'react';

import cartTotalPrice from "../utils/cartTotalPrice";

function OrderCard({ item }) {

  return (
    <div key={item.id} className="card">
      <div className="card-header d-flex justify-content-between">
        <div>
          <p>Order Status: {item.status}</p>
        </div>
        <div>
          <p>Order Date: {item.createdAt.substr(0, 10)}</p>
          <p>Delivery Date: {item.deliveredAt}</p>
        </div>
      </div>
      <div className="card-body">
        <div className="row m-3">
          <div className="col-md-6">
            <h5>Products</h5>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Size</th>
                  <th scope="col">Count</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {
                  item.cartContent.map((cartItem, idx) =>
                    <tr key={cartItem.productDetails.id + cartItem.size}>
                      <th scope="row">{idx + 1}</th>
                      <td>{cartItem.productDetails.name}</td>
                      <td>{cartItem.size[0]}</td>
                      <td>{cartItem.count}</td>
                      <td>{Number(cartItem.productDetails.price) * cartItem.count}</td>
                    </tr>
                  )
                }
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">#</th>
                  <td colSpan="3">Total Price</td>
                  <td>{cartTotalPrice(item.cartContent)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="col-md-6">
            <div>
              <h5>User Details</h5>
              <p>{item.customerDetails.email}</p>
            </div>
            <div>
              <h5>Delivery Address</h5>
              <p>City: {item.deliveryDetails.city}</p>
              <p>District: {item.deliveryDetails.district}</p>
              <p>Address: {item.deliveryDetails.addressOne}</p>
              <p>{item.deliveryDetails.addressTwo}</p>
              <p>Zip Code: {item.deliveryDetails.zipCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
