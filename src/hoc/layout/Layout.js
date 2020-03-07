import React, { Component } from "react";
import "./Layout.css";
import Drawer from "../../components/Navigation/Drawer/Drawer";

class Layout extends Component {

	render() {
		return (
			<div className="Layout">
				<Drawer />
				<main>
					{this.props.children}
				</main>
			</div>
		)
	}
}

export default Layout;