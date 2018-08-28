import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Worker from "./worker";
import UI from "./components/UI";
import "./App.css";

var worker = Worker.instance;
worker.init(store);

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <UI />
      </Provider>
    );
  }
}

export default App;
