import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
	<div>
		<h2 style={{ textAlign:"center"}}>
			<NavLink to="/">
				Welcome to React and Redux Starter Kit{" "}
			</NavLink>{" "}
		</h2>
	</div>
);

export default Header;
