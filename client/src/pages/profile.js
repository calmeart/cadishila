import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../context/auth";
import AddCategory from "../components/AddCategory";
import AddProduct from "../components/AddProduct";

function Profile() {

  const { id } = useParams();
  const { user } = useContext(AuthContext);

  return (
    id === user.id ? (
      <div>
        <div>
          <h2>Profile Details</h2>
          <p>username: {user.username}</p>
          <p>email: {user.email}</p>
          <p>member status: {user.isAdmin ? 'ADMIN' : 'MEMBER'} </p>
        </div>
        <div>
          <h2>Saved Items</h2>
        </div>
        <div>
          <h2>Order Track</h2>
        </div>
        <div>
          <h2>Reviews</h2>
        </div>
        {user.isAdmin && (
          <div id="adminPortal">
            <h2>Admin Portal</h2>
            <div className="d-flex align-items-start">
              <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <button className="nav-link" id="pill-product-tab" data-bs-toggle="pill" data-bs-target="#pill-product" type="button" role="tab" aria-controls="pill-product" aria-selected="true">Product</button>
                <button className="nav-link" id="pill-category-tab" data-bs-toggle="pill" data-bs-target="#pill-category" type="button" role="tab" aria-controls="pill-category" aria-selected="false">Category</button>
                <button className="nav-link" id="pill-users-tab" data-bs-toggle="pill" data-bs-target="#pill-users" type="button" role="tab" aria-controls="pill-users" aria-selected="false">Users</button>
                <button className="nav-link" id="pill-orders-tab" data-bs-toggle="pill" data-bs-target="#pill-orders" type="button" role="tab" aria-controls="pill-orders" aria-selected="false">Orders</button>
              </div>
              <div className="tab-content w-100" id="v-pills-tabContent">
                <div className="tab-pane fade" id="pill-product" role="tabpanel" aria-labelledby="pill-product-tab">
                  <AddProduct />
                </div>
                <div className="tab-pane fade" id="pill-category" role="tabpanel" aria-labelledby="pill-category-tab">
                  <AddCategory />
                </div>
                <div className="tab-pane fade" id="pill-users" role="tabpanel" aria-labelledby="pill-users-tab">User List</div>
                <div className="tab-pane fade" id="pill-orders" role="tabpanel" aria-labelledby="pill-orders-tab">Pending Orders</div>
              </div>
            </div>
          </div>
        )}
      </div>
    ) : (
      <h2>This account does not exist</h2>
    )

  )
};

export default Profile;
