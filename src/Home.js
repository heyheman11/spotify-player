import React from "react";
import { useSelector } from 'react-redux'

export const Home = props => {
  const accessToken = useSelector(state => state);
  // if (!props.location.state.accessToken) {
  //   <Redirect to="/"/>
  // }

  // const renderProps = () => {
  //   if (props.location.state) {
  //     if (props.location.state.accessToken) {
  //       return props.location.state.accessToken;
  //     }
  //   }
  // }

  console.log(accessToken);
  return <p>{"CHECK "}</p>;
};
