import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from '../context/auth';
import AuthRoute from '../utils/AuthRoute';
import NavBar from "./NavBar";
import Home from "../pages/home";
import About from "../pages/about";
import Login from "../pages/login";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache()
});

function App() {



    return (
      <ApolloProvider client={client}>
        <AuthProvider >
          <Router>
            <div className="container">

              <NavBar />

              <Switch>
                <Route exact path="/about" component={About} />
                <AuthRoute exact path="/login" component={Login} />
                <Route exact path="/" component={Home} />

              </Switch>

            </div>
          </Router>
        </AuthProvider>
      </ApolloProvider>
    );
}

export default App;
