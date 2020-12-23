import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import { connect } from "react-redux";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

const asyncOrder = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});
const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    let route = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={asyncAuth} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      route = (
        <Switch>
          <Route path="/orders" component={asyncOrder} />
          <Route path="/logout" component={Logout} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/auth" component={asyncAuth} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{route}</Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
