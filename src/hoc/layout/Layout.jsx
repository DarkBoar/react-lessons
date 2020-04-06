import React, { Component } from "react";
import "./Layout.css";
import { connect } from "react-redux";
import Drawer from "../../components/Navigation/Drawer/Drawer";

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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
    isNameLogin: state.auth.isNameLogin,
  };
}

export default connect(mapStateToProps)(Layout);
