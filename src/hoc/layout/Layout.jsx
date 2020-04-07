import React from "react";
import "./Layout.css";
import { connect } from "react-redux";
import Drawer from "../../components/Navigation/Drawer/Drawer";

const Layout = (props) => (
  <div className="Layout">
    <Drawer
      isAuthenticated={props.isAuthenticated}
      isNameLogin={props.isNameLogin}
    />
    <main>
      {props.children}
    </main>
  </div>
);

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
    isNameLogin: state.auth.isNameLogin,
  };
}

export default connect(mapStateToProps)(Layout);
