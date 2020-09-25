import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./Login";
import { Callback } from "./Callback";

import "./styles/global.scss";

export const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route path="/callback" component={Callback} />
      <Route path="/home" render={(props) => <Home {...props} />} />
    </BrowserRouter>
  );
};
