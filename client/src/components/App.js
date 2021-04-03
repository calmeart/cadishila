import React, { useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Home from "../pages/home";
import About from "../pages/about";
import Login from "../pages/login";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache()
});

function App() {

  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeLink, setActiveLink] = useState(path);

  function handleNavbarClick(e) {
    setActiveLink(e.target.name);
  };

    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="container">

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                <About />
              </Route>
              <Route path="/login" >
                <Login />
              </Route>
              <Route path="/" >
                <Home />
              </Route>
            </Switch>

          </div>
        </Router>
      </ApolloProvider>
    );
}

export default App;
