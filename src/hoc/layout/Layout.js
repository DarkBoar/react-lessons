import React, { Component } from "react";
import "./Layout.css";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import { connect } from "react-redux";
import Converter from "../../components/Converter/Converter";

class Layout extends Component {

	render() {
		return (
			<div className="Layout">
				<Drawer
					isAuthenticated={this.props.isAuthenticated}
					isNameLogin={this.props.isNameLogin}
				/>
				<main>
					{this.props.children}
				</main>
				<div className="converter">
					<Converter />
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.auth.token,
		isNameLogin: state.auth.isNameLogin
	}
}

export default connect(mapStateToProps)(Layout);