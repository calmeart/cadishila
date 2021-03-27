import React, { Component } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'

import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";
import ProductDetails from "./ProductDetails";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: ""
    };
    this.selectProduct = this.selectProduct.bind(this);
  }

  selectProduct(e) {
    e.preventDefault();
    this.setState({
      productId: e.target.value
    })
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <ProductList selectProduct={this.selectProduct}/>
          <ProductDetails id={this.state.productId} />
          <div id="addProductBox">
            <AddProduct />
          </div>
          <div id="addCategoryBox">
            <AddCategory />
          </div>
        </div>
      </ApolloProvider>
    );
  }

}

export default App;
