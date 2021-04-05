import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from '../context/auth';
import AuthRoute from '../utils/AuthRoute';
import NavBar from "./NavBar";
import Home from "../pages/home";
import About from "../pages/about";
import Login from "../pages/login";

function App() {

    return (
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
    );
}

export default App;
