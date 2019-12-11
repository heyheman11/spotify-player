import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./Login";
import { Callback } from "./Callback";

import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import "./App.scss";

import { store, persistor } from "./store";

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <div className="page-container">
          <Router>
            <Route exact path="/" component={Login} />
            <Route path="/callback" component={Callback} />
            <Route path="/home" render={props => <Home {...props} />} />
          </Router>
        </div>
      </PersistGate>
    </Provider>
  );
};
