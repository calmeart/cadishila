import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'

import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";
import ProductDetails from "./ProductDetails";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <ProductList />
        <AddProduct />
        <AddCategory />
        <ProductDetails />
      </div>
    </ApolloProvider>
  );
}

export default App;
