import React, { Component } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'

import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";
import ProductDetails from "./ProductDetails";
import ErrorToast from "./ErrorToast";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache()
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
      errorMessage: "",
      errorState: false
    };
    this.selectProduct = this.selectProduct.bind(this);
    this.appointError = this.appointError.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  selectProduct(e) {
    e.preventDefault();
    this.setState({
      productId: e.target.value
    })
  };

  appointError(errMessage) {
    this.setState({
      errorMessage: errMessage,
      errorState: true
    })
  }

  dismissError() {
    this.setState({
      errorMessage: "",
      errorState: false
    })
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <ProductList selectProduct={this.selectProduct}/>
          <ProductDetails id={this.state.productId} />
          <div id="addProductBox">
            <AddProduct appointError={this.appointError}  />
          </div>
          <div id="addCategoryBox">
            <AddCategory appointError={this.appointError} />
          </div>
          {this.state.errorState && (<ErrorToast errorMessage={this.state.errorMessage} dismissError={this.dismissError} />)}
        </div>
      </ApolloProvider>
    );
  }

}

export default App;
