import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";

import { AuthContext } from "../context/auth";
import CategoryList from "../components/CategoryList";
import AddProduct from "../components/AddProduct";
import UserList from "../components/UserList";
import OrderTrack from "../components/OrderTrack";

function Profile(props) {

  const { id } = useParams();
  const { user } = useContext(AuthContext);

  return (
    id === user.id ? (

        <Router basename={"/users/" + user.id}>
          <div id="profileScreen">
            <div className="row me-0">
              <div className="col-2">
              <div className="profileNavbar">
                <div className="d-flex flex-column p-3 text-white">
                  <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/" name="Profile Details">Profile Settings</Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="/products" name="Saved Products">Saved Products</Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="/reviews">Reviews</Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="/orders">Order Track</Link>
                    </li>
                    {user.isAdmin && (
                      <li>
                        <Link className="nav-link" to="/admin">Admin Portal</Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              </div>
              <div className="col-10">
              <Switch>
              <Route exact path="/" >
              <div>
                <h2>Profile Details</h2>
                <p>username: {user.username}</p>
                <p>email: {user.email}</p>
                <p>member status: {user.isAdmin ? 'ADMIN' : 'MEMBER'} </p>
              </div>
              </Route>
              <Route path="/products">
                <div>
                  <h2>Saved Items</h2>
                </div>
              </Route>
              <Route path="/reviews">
                <div>
                  <h2>Reviews</h2>
                </div>
              </Route>
              <Route path="/orders">
                <div>
                  <h2>Order Track</h2>
                </div>
              </Route>
              {user.isAdmin && (
                <Route path="/admin">
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
                          <CategoryList appointError={props.appointError} />
                        </div>
                        <div className="tab-pane fade" id="pill-users" role="tabpanel" aria-labelledby="pill-users-tab">
                          <UserList />
                        </div>
                        <div className="tab-pane fade" id="pill-orders" role="tabpanel" aria-labelledby="pill-orders-tab">
                          <h2>Order List</h2>
                          <OrderTrack />
                        </div>
                      </div>
                    </div>
                  </div>
                </Route>
              )}
            </Switch>
              </div>
            </div>
          </div>





        </Router>
    ) : (
      <h2>This account does not exist</h2>
    )

  )
};

export default Profile;
