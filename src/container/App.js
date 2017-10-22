import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";

import "../App.css";
import Header from "../components/header.js";
import Posts from "../container/Posts";
import PostDetails from "./PostDetails.js";

class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<Route exact path="/" component={Posts} />
				<Route path="/:postid" component={PostDetails} />
			</div>
		);
	}
}

export default withRouter(connect(null, null)(App));
