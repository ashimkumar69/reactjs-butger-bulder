import React, { Component } from "react";
import Aux from "../Auxiliary/Auxiliary";
import cssClasses from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  SideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  SideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          SideDrawerToggle={this.SideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          sideDrawerCloseed={this.SideDrawerCloseHandler}
        />
        <main className={cssClasses.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(Layout);
