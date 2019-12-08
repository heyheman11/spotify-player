import React from "react";
import { Login } from "./Login";
import { Callback } from "./Callback";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

export const App = () => {
  return (
    <div className="page-container">
      <Router>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/callback">
          <Callback />
        </Route>
      </Router>
    </div>
  );
};
