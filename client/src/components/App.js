import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from '../context/auth';
import AuthRoute from '../utils/AuthRoute';
import NavBar from "./NavBar";
import Home from "../pages/home";
import About from "../pages/about";
import Login from "../pages/login";
import ErrorToast from "./ErrorToast";
import ProductDetails from "./ProductDetails";
import CartContainer from "./CartContainer";

function App() {
  const [errors, setErrors] = useState({
    errorMessage: "",
    errorState: false
  });
  const [cartContent, setCartContent] = useState([]);

  function addItemToCart(productObject) {
    const { id, name, description, size, price, imageLink } = productObject;
    const isPresent = cartContent.find(item => item.productDetails.id === id)
    setCartContent(prev => {
      const tempArray = [...prev];
      if (isPresent) {
        const indexOfPresent = cartContent.findIndex(item => item.productDetails.id === id);
        tempArray.splice(indexOfPresent, 1);
        isPresent.count++;
        tempArray.push(isPresent);
      } else {
        tempArray.push({
          productDetails: {
            id,
            name,
            description,
            size,
            price,
            imageLink
          },
          count: 1
        })
      }
      return tempArray;
    })
  }

  function appointError(errMessage) {
    setErrors({
      errorMessage: errMessage,
      errorState: true
    });
  };

  function dismissError() {
    setErrors({
      errorMessage: "",
      errorState: false
    });
  };


    return (
        <AuthProvider >
          <Router>
            <div className="container">

              <NavBar />
              <CartContainer cartContent={cartContent}/>

              <Switch>
                <Route
                  exact
                  path="/about"
                  component={About}
                  />
                <AuthRoute
                  exact
                  path="/login"
                  component={Login}
                  appointError={appointError}/>
                <Route
                  exact
                  path="/"
                  render={(props) => (<Home {...props} appointError={appointError} />)}
                  />
                <Route
                  exact
                  path="/products/:id"
                  render={(props) => (<ProductDetails {...props} addItemToCart={addItemToCart} />)}
                  />
              </Switch>
              {errors.errorState && (<ErrorToast errorMessage={errors.errorMessage} dismissError={dismissError} />)}
            </div>
          </Router>
        </AuthProvider>
    );
}

export default App;
