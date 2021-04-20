import React, { useContext } from "react";
import { Route, Switch, useParams } from "react-router-dom";

import { AuthContext } from "../context/auth";
import CategoryList from "../components/CategoryList";
import AddProduct from "../components/AddProduct";
import UserList from "../components/UserList";
import OrderTrack from "../components/OrderTrack";
import OrderTrackAdmin from "../components/OrderTrackAdmin";

function Profile(props) {

  const { id } = useParams();
  const { user } = useContext(AuthContext);

  return (
    id === user.id ? (
          <div id="profileScreen">
            <div className="container">
              <Switch>
                <Route exact path={"/users/" + user.id} >
                <div>
                  <h2>Profile Details</h2>
                  <p>username: {user.username}</p>
                  <p>email: {user.email}</p>
                  <p>member status: {user.isAdmin ? 'ADMIN' : 'MEMBER'} </p>
                </div>
                </Route>
                <Route path={"/users/" + user.id + "/products"}>
                  <div>
                    <h2>Saved Items</h2>
                  </div>
                </Route>
                <Route path={"/users/" + user.id + "/reviews"}>
                  <div>
                    <h2>Reviews</h2>
                  </div>
                </Route>
                <Route path={"/users/" + user.id + "/orders"}>
                  <div className="orderTrack">
                    <h5>My Orders</h5>
                    <OrderTrack email={user.email} />
                  </div>
                </Route>
                {user.isAdmin && (
                  <Route path={"/users/" + user.id + "/admin"}>
                    <div id="adminPortal">
                      <h2>Admin Portal</h2>
                      <div className="d-flex flex-column flex-sm-row align-items-start">
                        <div className="nav flex-row flex-sm-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                          <button className="nav-link" id="pill-product-tab" data-bs-toggle="pill" data-bs-target="#pill-product" type="button" role="tab" aria-controls="pill-product" aria-selected="true">Product</button>
                          <button className="nav-link" id="pill-category-tab" data-bs-toggle="pill" data-bs-target="#pill-category" type="button" role="tab" aria-controls="pill-category" aria-selected="false">Category</button>
                          <button className="nav-link" id="pill-users-tab" data-bs-toggle="pill" data-bs-target="#pill-users" type="button" role="tab" aria-controls="pill-users" aria-selected="false">Users</button>
                          <button className="nav-link" id="pill-orders-tab" data-bs-toggle="pill" data-bs-target="#pill-orders" type="button" role="tab" aria-controls="pill-orders" aria-selected="false">Orders</button>
                        </div>
                        <div className="tab-content w-100" id="v-pills-tabContent">
                          <div className="tab-pane fade" id="pill-product" role="tabpanel" aria-labelledby="pill-product-tab">
                            <AddProduct appointError={props.appointError} />
                          </div>
                          <div className="tab-pane fade" id="pill-category" role="tabpanel" aria-labelledby="pill-category-tab">
                            <CategoryList appointError={props.appointError} />
                          </div>
                          <div className="tab-pane fade" id="pill-users" role="tabpanel" aria-labelledby="pill-users-tab">
                            <UserList />
                          </div>
                          <div className="tab-pane fade" id="pill-orders" role="tabpanel" aria-labelledby="pill-orders-tab">
                            <h2>Order List</h2>
                            <div className="orderTrack">
                              <OrderTrackAdmin />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Route>
                )}
              </Switch>
            </div>
          </div>
    ) : (
      <h2 className="text-center">This account does not exist</h2>
    )
  )
};

export default Profile;
