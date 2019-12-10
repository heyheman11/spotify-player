import React from "react";
import { Login } from "./Login";
import { Callback } from "./Callback";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from './Home';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import "./App.scss";
import loginReducer from './reducer';

const store = createStore(combineReducers({loginReducer}))

export const App = () => {
  return (
    <Provider store={store} >
      <div className="page-container">
        <Router>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/callback">
            <Callback />
          </Route>
          <Route path="/home" render={props => <Home {...props}/>}/>
        </Router>
      </div>
    </Provider>
  );
};
