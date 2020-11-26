import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  // static getDerivedStateFromProps(props, state) {
  //   const querys = new URLSearchParams(props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let query of querys.entries()) {
  //     if (query[0] === "price") {
  //       price = query[1];
  //     } else {
  //       ingredients[query[0]] = +query[1];
  //     }
  //   }
  //   return {
  //     ingredients: ingredients,
  //     totalPrice: price,
  //   };
  // }

  componentWillMount() {
    const querys = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let query of querys.entries()) {
      if (query[0] === "price") {
        price = query[1];
      } else {
        ingredients[query[0]] = +query[1];
      }
    }
    this.setState({
      ingredients: ingredients,
      totalPrice: price,
    });
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              {...props}
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
