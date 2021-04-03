import React, { useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";
import ProductDetails from "./ProductDetails";
import ErrorToast from "./ErrorToast";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache()
})

function App() {

  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeLink, setActiveLink] = useState(path);

  function handleNavbarClick(e) {
    setActiveLink(e.target.name);
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     productId: "",
  //     errorMessage: "",
  //     errorState: false
  //   };
  //   this.selectProduct = this.selectProduct.bind(this);
  //   this.appointError = this.appointError.bind(this);
  //   this.dismissError = this.dismissError.bind(this);
  // }

  // selectProduct(e) {
  //   e.preventDefault();
  //   this.setState({
  //     productId: e.target.value
  //   })
  // };
  //
  // appointError(errMessage) {
  //   this.setState({
  //     errorMessage: errMessage,
  //     errorState: true
  //   })
  // }
  //
  // dismissError() {
  //   this.setState({
  //     errorMessage: "",
  //     errorState: false
  //   })
  // }
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="container">

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className={activeLink === "home" ? "nav-link active" : "nav-link"} to="/" name="home" onClick={handleNavbarClick} >Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={activeLink === "about" ? "nav-link active" : "nav-link"} to="/about" name="about" onClick={handleNavbarClick} >About</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={activeLink === "login" ? "nav-link active" : "nav-link"} to="/login" name="login" onClick={handleNavbarClick} >Login</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <Switch>
              <Route path="/about" >
                <h1>About</h1>
              </Route>
              <Route path="/login" >
                <h1>Login</h1>
              </Route>
              <Route path="/" >
                <h1>Home</h1>
              </Route>
            </Switch>

          </div>
        </Router>
        {
        // <div>
        //   <ProductList selectProduct={this.selectProduct}/>
        //   <ProductDetails id={this.state.productId} selectProduct={this.selectProduct} />
        //   <div id="addProductBox">
        //     <AddProduct appointError={this.appointError}  />
        //   </div>
        //   <div id="addCategoryBox">
        //     <AddCategory appointError={this.appointError} />
        //   </div>
        //   {this.state.errorState && (<ErrorToast errorMessage={this.state.errorMessage} dismissError={this.dismissError} />)}
        // </div>
        }
      </ApolloProvider>
    );
}

export default App;
