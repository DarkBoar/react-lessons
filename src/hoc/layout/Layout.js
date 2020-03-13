import React, { Component } from "react";
import "./Layout.css";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import { connect } from "react-redux";

class Layout extends Component {

	render() {
		return (
			<div className="Layout">
				<Drawer
					isAuthenticated={this.props.isAuthenticated}
				/>
				<main>
					{this.props.children}
				</main>
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.auth.token
	}
}

export default connect(mapStateToProps)(Layout);