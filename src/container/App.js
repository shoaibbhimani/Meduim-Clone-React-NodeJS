import React, { Component } from "react";
import { connect } from "react-redux";

import logo from "../logo.svg";
import reduxlogo from "../redux.svg";
import "../App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={reduxlogo} className="App-logo reduxlogo" alt="logo" />
          <h2>Welcome to React and Redux Starter Kit </h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/container/App.js</code> and save to
          reload. <br />
          <br />
          <div>Redux Logger and Promise Middleware Enabled</div>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProp = dispatch => {
  return {
    addTodo: () => {
      dispatch({
        type: "ADD_TODO",
        payload: "dasd"
      });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProp)(App);
