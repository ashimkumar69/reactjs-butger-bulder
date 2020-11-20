import React, { Component } from "react";
import Aux from "../Auxiliary/Auxiliary";
import cssClasses from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
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
        <Toolbar SideDrawerToggle={this.SideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          sideDrawerCloseed={this.SideDrawerCloseHandler}
        />
        <main className={cssClasses.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
