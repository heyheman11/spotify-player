import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./Login";
import { Callback } from "./Callback";

import "./App.scss";

export const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route path="/callback" component={Callback} />
      <Route path="/home" render={props => <Home {...props} />} />
    </Router>
  );
};
