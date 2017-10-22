import React from "react";

import logo from "../logo.svg";
import reduxlogo from "../redux.svg";

const Header = () => (
	<div className="App-header">
		<img src={logo} className="App-logo" alt="logo" />
		<img src={reduxlogo} className="App-logo reduxlogo" alt="logo" />
		<h2>Welcome to React and Redux Starter Kit </h2>
	</div>
);

export default Header;
