import React, { Component } from "react";
import BuoyMap from "./BuoyMap";
import { connect } from "react-redux";

class UI extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>{this.props.webSocketConnected ? <BuoyMap /> : <div />}</div>;
  }
}

const selector = state => {
  return {
    webSocketConnected: state.webSocketConnected
  };
};

export default connect(selector)(UI);
