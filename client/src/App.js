import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute';
import NavBar from "./components//NavBar";
import Footer from "./components/Footer";
import Home from "./pages/home";
import About from "./pages/about";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Payment from "./pages/payment";
import ErrorToast from "./components/ErrorToast";
import ProductDetails from "./components/ProductDetails";
import CartContainer from "./components/CartContainer";

function App() {
  const [errors, setErrors] = useState({
    errorMessage: "",
    errorState: false
  });
  const [cartContent, setCartContent] = useState([]);

  function addItemToCart(productObject) {
    const { id, name, description, size, price, imageLink } = productObject;
    const isPresent = cartContent.find(item => item.cartId === (id + size) );
    setCartContent(prev => {
      const tempArray = [...prev];
      if (isPresent) {
        const indexOfPresent = cartContent.findIndex(item => item.productDetails.id === (id + size) );
        tempArray.splice(indexOfPresent, 1);
        isPresent.count++;
        tempArray.push(isPresent);
      } else {
        tempArray.push({
          productDetails: {
            id,
            name,
            description,
            price,
            imageLink
          },
          count: 1,
          size,
          cartId: id + size
        })
      }
      return tempArray;
    })
  };

  function incrementCountInCart(e) {
    const { name } = e.target;
    const tempArray = [...cartContent];
    const foundProductIndex = tempArray.findIndex(item => item.cartId === name );
    tempArray[foundProductIndex].count++;
    setCartContent(tempArray);
  };

  function decrementCountInCart(e) {
    const { name } = e.target;
    const tempArray = [...cartContent];
    const foundProductIndex = tempArray.findIndex(item => item.cartId === name );
    if (tempArray[foundProductIndex].count === 0) {
      return;
    }
    tempArray[foundProductIndex].count--;
    setCartContent(tempArray);
  };

  function removeItemFromCart(e) {
    const { name } = e.target;
    const tempArray = [...cartContent];
    const foundProductIndex = tempArray.findIndex(item => item.cartId === name );
    tempArray.splice(foundProductIndex, 1);
    setCartContent(tempArray);
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



              <div id="header" className="text-center">
                <NavBar />
                <h1>CadiShila</h1>
              </div>
              <CartContainer cartContent={cartContent} increment={incrementCountInCart} decrement={decrementCountInCart} remove={removeItemFromCart} />
              <div id="siteContent">
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
                    path="/users/:id"
                    render={(props) => (<Profile {...props} appointError={appointError} />)}
                    />
                  <Route
                    exact
                    path="/products/:id"
                    render={(props) => (<ProductDetails {...props} addItemToCart={addItemToCart} appointError={appointError} />)}
                    />
                  <Route
                    exact
                    path="/checkout"
                    render={(props) => (<Payment {...props} cartContent={cartContent} appointError={appointError} />)}
                    />
                </Switch>
              </div>
              {errors.errorState && (<ErrorToast errorMessage={errors.errorMessage} dismissError={dismissError} />)}
              <Footer />
          </Router>
        </AuthProvider>
    );
}

export default App;
